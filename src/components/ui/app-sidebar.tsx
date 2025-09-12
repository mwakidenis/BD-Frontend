// "use client";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// // import Logo from "../home/Logo"

// type TItem = {
//   title: string;
//   url: string;
//   icon: React.ElementType;
// };

// export function AppSidebar({ items }: { items: TItem[] }) {
//   const pathname = usePathname();

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <Link href="/">
//             <Logo />
//           </Link>
//           <SidebarGroupLabel className="text-lg font-semibold py-6">
//             <Link href="/">MediCommerce</Link>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="gap-4">
//               {items.map((item: TItem) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.url}
//                       className={`${
//                         pathname === item.url
//                           ? "text-primary font-semibold"
//                           : ""
//                       }`}
//                     >
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
