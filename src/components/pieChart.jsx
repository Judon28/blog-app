
/*import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function PostPieChart({ posts }) {

    // 🟢 STEP 1 — Group categories
    const categoryMap = {};

    posts.forEach(post => {
        const category = post.category || "Other";

        if (categoryMap[category]) {
            categoryMap[category] += 1;
        } else {
            categoryMap[category] = 1;
        }
    });

    // 🟢 STEP 2 — Convert to array
    const totalPosts = posts.length;

    const data = Object.keys(categoryMap).map(key => ({
        name: key,
        value: categoryMap[key],
        percentage: ((categoryMap[key] / totalPosts) * 100).toFixed(1)
    }));


    // 🟢 STEP 3 — Custom label inside pie
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight="bold"
            >
                {(percent * 100).toFixed(0)}%
            </text>
        );
    };


    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={renderCustomLabel} // ✅ inside labels
                        labelLine={false} // ❌ removes outside lines
                    />

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>
        </div>
    );
}*/

/*import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function PostPieChart({ posts }) {

  // 🎨 Bright modern colors
  const COLORS = [
    "#6366f1", // indigo
    "#22c55e", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#3b82f6", // blue
    "#a855f7", // purple
    "#14b8a6", // teal
    "#f43f5e"  // pink
  ];

  // 🟢 STEP 1 — Group categories (FIXED)
  const categoryMap = {};

  posts.forEach(post => {
    const rawCategory = post.category || "Other";

    const normalized = rawCategory.trim().toLowerCase(); // ✅ fix duplicates

    if (categoryMap[normalized]) {
      categoryMap[normalized].value += 1;
    } else {
      categoryMap[normalized] = {
        value: 1,
        display:
          normalized.charAt(0).toUpperCase() + normalized.slice(1)
      };
    }
  });

  // 🟢 STEP 2 — Convert to array
  const totalPosts = posts.length;

  const data = Object.keys(categoryMap).map(key => ({
    name: categoryMap[key].display, // ✅ clean name
    value: categoryMap[key].value,
    percentage: (
      (categoryMap[key].value / totalPosts) *
      100
    ).toFixed(1)
  }));

  // 🟢 STEP 3 — Custom label
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const RADIAN = Math.PI / 180;

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="w-full h-[400px] border">
      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomLabel}
            labelLine={false}
          >
            
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}*/

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PostPieChart({ posts }) {

  // 🎨 Bright modern colors
  const COLORS = [
    "#6366f1", // indigo
    "#22c55e", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#3b82f6", // blue
    "#a855f7", // purple
    "#14b8a6", // teal
    "#f43f5e"  // pink
  ];

  // 🟢 STEP 1 — Group categories
  const categoryMap = {};

  posts.forEach(post => {
    const rawCategory = post.category || "Other";
    const normalized = rawCategory.trim().toLowerCase();

    if (categoryMap[normalized]) {
      categoryMap[normalized].value += 1;
    } else {
      categoryMap[normalized] = {
        value: 1,
        display:
          normalized.charAt(0).toUpperCase() + normalized.slice(1)
      };
    }
  });

  // 🟢 STEP 2 — Convert to array + assign colors
  const totalPosts = posts.length;

  const data = Object.keys(categoryMap).map((key, index) => ({
    name: categoryMap[key].display,
    value: categoryMap[key].value,
    percentage: (
      (categoryMap[key].value / totalPosts) *
      100
    ).toFixed(1),
    fill: COLORS[index % COLORS.length] // ✅ color assigned here
  }));

  // 🟢 STEP 3 — Custom label
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const RADIAN = Math.PI / 180;

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="w-full h-[300px] flex gap-5 ">
        <div className="w-[60%] h-full flex">
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={renderCustomLabel}
                    labelLine={false}
                />

                <Tooltip />

                </PieChart>
            </ResponsiveContainer>

            
            <div className="flex items-center w-[40%]">
                <ul>
                {data.map((item, index) => (
                    <li key={index} className="flex gap-3 items-center py-2">
                    <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: item.fill }}
                    ></div>

                    <span>
                        {item.name} {item.percentage}%
                    </span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
      
    </div>
  );
}