import Marquee from "react-fast-marquee";
import { useTheme } from "nextra-theme-docs";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SetupHero } from "./Setup";
import { Section } from "./Section";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { cn } from "@/lib/utils";

import { PanelParticles } from "@/components/PanelParticles";
import { useLocale } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import customers from "../../../customers.json";

export const StackItem = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "mx-6 size-[50px]",
        "text-neutral-800 dark:text-neutral-100",
        className,
      )}
    ></div>
  );
};

export default function HomepageHero() {
  // const { t } = useLocale();
  const { t, currentLocale } = useLocale();

  const featureList = t("featureList");
  const faqs = t("faqs");
  // const features = t("features")

  const { resolvedTheme } = useTheme();

  const processedFeatureList = useMemo(() => {
    const icons = [
      "icon-[material-symbols--rocket-launch-outline]",
      "icon-[icon-park-outline--international]",
      "icon-[nonicons--typescript-16]",
      "icon-[carbon--face-satisfied] hover:icon-[carbon--face-wink]",
      "icon-[teenyicons--tailwind-outline]",
      "icon-[tabler--calendar-code]",
      "icon-[carbon--color-palette]",
      "icon-[carbon--ibm-cloud-transit-gateway]",
      "icon-[carbon--flash]",
    ];
    return featureList.map((item, index) => {
      return {
        ...item,
        icon: <span className={icons[index] || icons[0]}></span>,
      };
    });
  }, [featureList]);

  return (
    <>
      {/*<PanelParticles />*/}
      <SetupHero />
      <div className="relative z-[1] pb-10 md:pb-[100px]">
        <Section
          title={t("customers")}
          description={
            <Link
              href={`/${currentLocale}/documentation/customers`}
              className={"underline hover:text-blue-500"}
            >
              {t("lookMoreCustomers")}
            </Link>
          }
        >
          <div className="flex justify-center w-full max-w-7xl h-[80px] my-[30px]">
            <Marquee
              pauseOnHover
              autoFill
              gradient
              direction="right"
              gradientColor="hsl(var(--background))"
              speed={60}
            >
              {customers.map((customer, index) => {
                return (
                  <Image
                    key={index}
                    className={cn("mx-6")}
                    src={customer.image}
                    alt={""}
                    width={customer.width}
                    height={0}
                    // height={customer.width}
                  />
                );
              })}

              {/*<StackItem className="icon-[akar-icons--nextjs-fill]" />*/}
              {/*<StackItem className="icon-[simple-icons--react]" />*/}
              {/*<StackItem className="icon-[simple-icons--tailwindcss]" />*/}
              {/*<StackItem className="icon-[teenyicons--framer-outline]" />*/}
              {/*<StackItem className="icon-[simple-icons--shadcnui]" />*/}
              {/*<StackItem className="icon-[simple-icons--typescript]" />*/}
              {/*<StackItem className="icon-[fa6-brands--sass]" />*/}
              {/*<StackItem className="icon-[teenyicons--eslint-outline]" />*/}
              {/*<StackItem className="icon-[simple-icons--postcss]" />*/}
              {/*<StackItem className="icon-[simple-icons--nextra]" />*/}
              {/*<StackItem className="icon-[line-md--iconify1]" />*/}
            </Marquee>
          </div>
        </Section>
        <Section title={t("features")} description={t("featuresDesc")}>
          <div className="flex justify-center w-full max-w-7xl">
            <HoverEffect items={processedFeatureList} />
          </div>
        </Section>
        <Section title={t("frequentlyAskedQuestions")} tallPaddingY>
          <Accordion type="single" collapsible className="w-full max-w-5xl">
            {faqs.map((faqItem, index) => (
              <AccordionItem value={faqItem.question} key={index}>
                <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                <AccordionContent>{faqItem.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </div>
    </>
  );
}
