import NavbarHome from "../../components/navbar/NavbarHome";
import Link from "next/link";
import Image from "next/image";
import taskBro from "../../../public/images/Task-bro.webp";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header className="bg-background-1">
        <NavbarHome />
        <section className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-5 flex flex-col justify-center items-center order-2 lg:order-1">
            <h1 className="text-center">
              <span className="text-purple">Managing</span> Your{" "}
              <span className="text-purple">Tasks</span> Has Never Been{" "}
              <span className="text-purple">Easier</span>
            </h1>
            <p className="text-gray text-center text-lg text-balance font-medium mb-5">
              Transform your productivity with our{" "}
              <strong>sleek and intuitive task management app</strong>, making
              it <strong>effortless</strong> to organize and accomplish your
              goals.
            </p>
            <Button size="lg" className="bg-purple hover:bg-purple/80">Start for Free</Button>
          </div>
          <div className="lg:w-1/2 p-10 md:p-20 lg:p-24 order-1 lg:order-2">
            <figure>
              <Image src={taskBro} alt="Task Bro" />
              <figcaption className="text-center text-white">
                <Link
                  target="_blank"
                  href="https://storyset.com/work"
                  className="link"
                >
                  Work illustrations by Storyset
                </Link>
              </figcaption>
            </figure>
          </div>
        </section>
      </header>
      <main className="p-10 bg-background-2">dfsdf
        
      </main>
    </>
  );
}
