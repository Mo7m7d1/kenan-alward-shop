import { buttonVariants } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Address } from "@prisma/client";
import { Edit, EditIcon } from "lucide-react";
import { Link } from "next-view-transitions";

export default function AddressesTable({
	addresses,
}: {
	addresses: Address[] | undefined;
}) {
	return (
		<Table className="scroll-my-14">
			<TableHeader>
				<TableRow>
					<TableHead className="text-right font-semibold">المدينة</TableHead>
					<TableHead className="text-right font-semibold">العنوان</TableHead>
					<TableHead className="text-right font-semibold">الهاتف</TableHead>
					<TableHead className="text-right font-semibold">
						رمز المدينة
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{addresses?.map((address) => (
					<TableRow key={address.id}>
						<TableCell className="text-right">{address.city}</TableCell>
						<TableCell className="text-right">{address.address}</TableCell>
						<TableCell className="text-right">{address.phone}</TableCell>
						<TableCell className="text-right">{address.postalCode}</TableCell>
						<TableCell className="text-right">
							<Link
								href={`/profile/addresses/${address.id}`}
								className={buttonVariants({
									size: "icon",
									variant: "secondary",
								})}
							>
								<EditIcon />
								{/* تعديل */}
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
