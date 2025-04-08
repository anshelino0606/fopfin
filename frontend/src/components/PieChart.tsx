import {PieChart} from "@mui/x-charts";
import {Box} from "@mui/material";


export const PieChartComponent = () => {
		return (
				<Box sx={{flexGrow: 1}}>

						<PieChart
								series={[
										{
												data: [
														{id: 0, value: 10, label: 'series A'},
														{id: 1, value: 15, label: 'series B'},
														{id: 2, value: 20, label: 'series C'},
												],
												outerRadius: 80,
										},
								]}
								height={300}
						/>
				</Box>
		);
};
