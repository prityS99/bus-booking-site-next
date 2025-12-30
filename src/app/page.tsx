"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/compo/Banner";
import Offers from "@/compo/offers";

export default function Home() {
  return (
  <>
  <Banner/>
  <Offers/>
  </>
  );
}
