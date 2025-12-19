import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { userCourseStates } from "../../store/courseStore";
import image1 from "../../assets/DashBoard/Stats.png";
const Stats = () => {
  const { courses } = userCourseStates();

  const courseData = [
    { name: "Enrolled", count: courses.length },
    { name: "Completed", count: 1 },
  ];

  return (
    <div className="p-6 rounded-2xl ">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">
        Course Progress
      </h3>
      <div className=" grid lg:grid-cols-2 sm:lg-cols-1 gap-6 p-2 ">
        <div data-aos="fade-right">
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={courseData}>
              <XAxis dataKey="name" tick={{ fill: "#1e40af", fontSize: 16 }} />
              <YAxis tick={{ fill: "#475569" }} />
              <Tooltip />
              <Bar dataKey="count">
                {courseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#2563eb" : "#16a34a"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center relative  ">
             <div className="absolute inset-40 bg-linear-to-tr from-slate-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
          <img
            src={image1}
            alt="Course statistics"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            className="w-full max-w-md rounded-2xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
