import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function Providers({ children }: PropsWithChildren) {

    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <NextUIProvider >
                {children}
            </NextUIProvider>
        </NextThemesProvider>
    );
}