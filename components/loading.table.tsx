/*import {
  TableBody,
  TableCell,

  TableRow,
} from "../../../components/ui/table";*/
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function TableLoading({ table }) {
	return (
		<TableBody>
			{table.getRowModel().rows?.length &&
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								<Skeleton className="h-3 w-1/2" />
							</TableCell>
						))}
					</TableRow>
				))}
		</TableBody>
	);
}

export default TableLoading;
