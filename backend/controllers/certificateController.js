import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { fileURLToPath } from 'url';
import { sendNotification } from '../utils/notificationSender.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateCertificateId = () => {
  return 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;

    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId).populate('instructor');

    if (!user || !course) {
      return res.status(404).json({ error: 'User or course not found' });
    }

    // Create certificates directory if it doesn't exist
    const certificatesDir = path.join(__dirname, '../../certificates');
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true });
    }

    const certificateId = generateCertificateId();
    const fileName = `${certificateId}.pdf`;
    const filePath = path.join(certificatesDir, fileName);

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      orientation: 'landscape',
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add certificate design
    doc.fontSize(48).font('Helvetica-Bold').text('Certificate of Completion', 100, 150);

    doc.fontSize(20).font('Helvetica').text('This is to certify that', 100, 250);

    doc
      .fontSize(32)
      .font('Helvetica-Bold')
      .text(`${user.firstName} ${user.lastName}`, 100, 300);

    doc.fontSize(20).font('Helvetica').text('has successfully completed the course', 100, 380);

    doc.fontSize(28).font('Helvetica-Bold').text(`${course.title}`, 100, 430);

    doc.fontSize(16).font('Helvetica').text(`Instructor: ${course.instructor.firstName} ${course.instructor.lastName}`, 100, 500);

    doc.fontSize(14).text(`Completion Date: ${new Date().toLocaleDateString()}`, 100, 530);

    doc.fontSize(14).text(`Certificate ID: ${certificateId}`, 100, 560);

    doc.end();

    // Save certificate to database after PDF is created
    stream.on('finish', async () => {
      const certificate = new Certificate({
        certificateId,
        student: req.user.id,
        course: courseId,
        instructor: course.instructor._id,
        pdfUrl: `/certificates/${fileName}`,
      });

      await certificate.save();

      // Send notification
      await sendNotification(req, {
        recipientId: req.user.id,
        type: 'certificate_earned',
        title: 'Certificate Earned!',
        message: `Congratulations! You have earned a certificate for ${course.title}`,
        relatedId: certificate._id,
      });

      res.status(201).json({
        success: true,
        certificate,
        message: 'Certificate generated successfully',
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id })
      .populate('course')
      .populate('instructor', 'firstName lastName');

    res.status(200).json({ success: true, certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('course')
      .populate('instructor', 'firstName lastName')
      .populate('student', 'firstName lastName email');

    res.status(200).json({ success: true, certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
