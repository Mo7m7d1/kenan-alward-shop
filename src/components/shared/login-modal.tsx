import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Signin from "./signin";
import { LogInIcon } from "lucide-react";

export function LoginModal({ callbackUrl }: { callbackUrl?: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{callbackUrl ? (
					<Button className="font-semibold" title="تسجيل الدخول">
						الدفع
					</Button>
				) : (
					<Button variant="ghost" size={"icon"} title="تسجيل الدخول">
						<LogInIcon className="h-6" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle className="text-center">تسجيل الدخول</DialogTitle>
					<DialogDescription className="text-center">
						قم بتسجيل الدخول للمتابعة
					</DialogDescription>
				</DialogHeader>

				<Signin callback_url={callbackUrl} />
			</DialogContent>
		</Dialog>
	);
}
