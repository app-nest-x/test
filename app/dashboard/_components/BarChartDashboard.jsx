import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BarChartDashboard = ({budgetList}) => {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg ">Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
          <BarChart
          width={500}
          height={500}
          data={budgetList}
          margin={{
            top: 7
          }}
          >
              <XAxis dataKey='name'/>
              <YAxis />
              <Tooltip/>
              <Legend/>
              <Bar dataKey='totalSpend' stackId='a' fill="#3E2723"/>
              <Bar dataKey='amount' stackId='a' fill="#D7CCC8"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard