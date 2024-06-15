import { Link } from "next-view-transitions";
import {
	Activity,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getReports } from "@/server/models/reports";
import { formatDateArabic, formatMoney } from "@/lib/utils";
import { orderStatus } from "./orders/page";

export default async function Page() {
	const data = await getReports();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" dir="rtl">
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							إجمالي الإيرادات
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatMoney(data?.totalRevenue ?? 0)}
						</div>
						{/* <p className="text-xs text-muted-foreground">
							+20.1% من الشهر الماضي
						</p> */}
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-1">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">الطلبات</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							+{data?.totalSubscriptions}
						</div>
						{/* <p className="text-xs text-muted-foreground">
							+180.1% من الشهر الماضي
						</p> */}
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">المبيعات</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+{data?.totalSales}</div>
						{/* <p className="text-xs text-muted-foreground">
							+19% من الشهر الماضي
						</p> */}
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">النشطون الآن</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+{data?.activeUsers}</div>
						{/* <p className="text-xs text-muted-foreground">
							+201 منذ الساعة الماضية
						</p> */}
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>المعاملات</CardTitle>
							<CardDescription>المعاملات الأخيرة من متجرك.</CardDescription>
						</div>
						{/* <Button asChild size="sm" className="mr-auto gap-1">
							<Link href="#">
								عرض الكل
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button> */}
					</CardHeader>
					<CardContent>
						<Table dir="rtl">
							<TableHeader>
								<TableRow>
									<TableHead className="text-right">العميل</TableHead>
									<TableHead className="text-right">الحالة</TableHead>
									<TableHead className="text-right">المبلغ</TableHead>
									<TableHead className="text-right">التاريخ</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.recentTransactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell className="text-right">
											<div className="font-medium">{transaction.user.name}</div>
											<div>{transaction.user.email}</div>
										</TableCell>
										<TableCell className="text-right">
											<Badge className="text-xs" variant="outline">
												{orderStatus[transaction.status]}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											{formatMoney(transaction.total)}
										</TableCell>
										<TableCell className="text-right">
											{formatDateArabic(
												new Date(transaction.createdAt).toISOString()
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-5">
					<CardHeader>
						<CardTitle>المبيعات الأخيرة</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-8">
						{data?.recentTransactions.slice(0, 5).map((transaction) => (
							<div key={transaction.id} className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src={transaction.user.image ?? "/images/placeholder.svg"}
										alt="Avatar"
									/>
									<AvatarFallback>{transaction?.user?.email!}</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										{transaction.user.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{transaction.user.email}
									</p>
								</div>
								<div className="mr-auto font-medium">
									{formatMoney(transaction.total)}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
