"use client";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";


interface UpgradeModalProps {

    open: boolean,
    onOpenChange: (open: boolean) => void;



};

export const UpgaredModal = ({

    open,
    onOpenChange,




}: UpgradeModalProps) => {



    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro </AlertDialogTitle>
                    <AlertDialogDescription>
                        You need to active Subscription to perform this action.
                        Upgarde to Pro to unlock all the features.

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => authClient.checkout({ slug: "pro" })}>Upgrade</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
