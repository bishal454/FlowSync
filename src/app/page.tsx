import { cn } from "@/lib/utils";
 //The `cn` function is a utility that combines and merges class names for conditional styling in React components. improvement over templemet in  tailwind css.
const Page=()=>{
  return (
    <div  className={cn("text-red-500")}> HEllo world </div>
  )
}

export default Page;

//this app folder is router of next js .and this page.tsx is  root file of the project .
