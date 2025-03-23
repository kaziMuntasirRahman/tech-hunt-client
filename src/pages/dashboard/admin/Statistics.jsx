import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ['#0088FE', '#00C49F', 'crimson'];

const RADIAN = Math.PI / 180;
// Custom Label Rendering Function
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="center"
      fontSize={20}
      fontWeight="500"
    >
      {` ${name} (${(percent * 100).toFixed()}%)`}
    </text>
  );
}

const Statistics = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  const { data: products = [], isLoading: productLoading = true } = useQuery({
    query: ['all-products'],
    queryFn: async () => {
      const response = await axiosSecure.get('/products')
      return response.data;
    }
  })

  const { data: users = [], isLoading: loading = true } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosSecure.get('/users');
      return response.data;
    }
  });

  const [data, setData] = useState([
    { name: 'Users', value: 50 },
    { name: 'Products', value: 50 },
    { name: 'Reviews', value: 50 },
  ]);

  useEffect(() => {
    let totalUser = 1;
    let totalProduct = 0;
    let totalReview = 0;
    if (products && users) {
      totalUser = users.length;
      totalProduct = products.length
      totalReview = products.reduce((total, product) => total + product.reviews.length, 0)
    }
    setData([
      { name: 'Users', value: totalUser },
      { name: 'Products', value: totalProduct },
      { name: 'Reviews', value: totalReview },
    ])
  }, [products, users])


  return (
    <div className="relative flex flex-col items-center p-8 bg-gray-100 w-full h-screen">
      <h1 className="text-4xl font-semibold text-gray-600">Sites Statistics</h1>
      {(productLoading || loading) && (
        <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
          <span className="loader scale-200"></span>
        </div>
      )}

      <div className="self-start mt-10">
        <h1 className="text-xl text-gray-500 font-semibold">Total User: {data[0].value}</h1>
        <h1 className="text-xl text-gray-500 font-semibold">Total Product: {data[1].value}</h1>
        <h1 className="text-xl text-gray-500 font-semibold">Total Reviews: {data[2].value}</h1>
      </div>
      <ResponsiveContainer height={700} width={700}>
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={250}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                aria-label="{entry.name}"
                zoomAndPan="hello"
                color="black"
                className="tooltip"
                data-tip="hello"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;