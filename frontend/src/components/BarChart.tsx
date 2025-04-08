import { BarChart } from "@mui/x-charts";
import {Box} from "@mui/material";

export const BarChartComponent = () => {
		return (
				<Box sx={{ flexGrow: 1 }}>
						<BarChart
								xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
								series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
								height={300}
						/>
				</Box>
		);
};