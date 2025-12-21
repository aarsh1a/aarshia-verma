import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore my projects on an infinite canvas",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
