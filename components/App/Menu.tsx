import { useState, useEffect } from "react";
import gsap from "gsap";
import styles from "@/styles/app/menu.module.scss";
import Image from "next/image";
import Link from "next/link";

interface MenuProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  handleClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ modalRef, handleClose }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!modalRef.current) return;
    const modal = modalRef.current;
    gsap.fromTo(
      modal,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [modalRef]);

  return (
    <div ref={modalRef} className={styles.menu}>
      <div className={styles.menu__header}>
        <div>
          <div className={styles.menu__header__image}>
            <Image
              src={"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20103%2064'%3e%3cpath%20fill='%23FF5F00'%20d='M65.333%206.756H37.522v50.311h27.81V6.756Z'/%3e%3cpath%20fill='%23EB001B'%20d='M39.289%2032c0-10.222%204.767-19.289%2012.096-25.156C45.998%202.578%2039.2%200%2031.785%200%2014.214%200%200%2014.311%200%2032s14.215%2032%2031.784%2032c7.416%200%2014.215-2.578%2019.6-6.844C44.056%2051.289%2039.29%2042.133%2039.29%2032Z'/%3e%3cpath%20fill='%23F79E1B'%20d='M102.857%2032c0%2017.689-14.215%2032-31.784%2032-7.416%200-14.215-2.578-19.6-6.844C58.889%2051.289%2063.568%2042.222%2063.568%2032S58.801%2012.711%2051.473%206.844C56.858%202.578%2063.657%200%2071.073%200c17.57%200%2031.784%2014.311%2031.784%2032Z'/%3e%3c/svg%3e"}
              alt="Mastercard"
              fill
            />
          </div>
          <Link className={styles.menu__header__link} href={"/"}>Home</Link>
          <Link className={styles.menu__header__link} href={"#"}>Goals | 06</Link>
        </div>
        <button onClick={handleClose}>✕</button>
      </div>

      <div className={styles.menu__list}>
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={styles.menu__item}
            onClick={() => toggleItem(goal.id)}
          >
            <div>
              <span className={styles.menu__item__number}>{goal.id.toString().padStart(2, "0")}{" "}</span>
              <div className={styles.menu__item__header}>
                <span>{goal.title}</span>
                <button className={openId === goal.id ? "rotate-180" : ""}>
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.5C1 0.5 4.5 4 5 4C5.40109 4 8.5 0.5 8.5 0.5" stroke="#141413" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={`${styles.menu__item__content} ${openId === goal.id ? styles.open : ""}`}>
              <ul>
                {goal.items.map((subItem, i) => (
                  <li key={i}>{subItem}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

const goals = [
  {
    id: 1,
    title: "Protect and build trust",
    items: [
      "Safeguarding against fraud",
      "Better, safer biometric checkout",
      "Identifying your cyber risks and preventing attacks",
    ],
  },
  {
    id: 2,
    title: "Strengthen customer relationships",
    items: [
      "Delivering meaningful experiences",
      "Enhancing customer loyalty",
      "Personalizing engagement across channels",
    ],
  },
  {
    id: 3,
    title: "Make data-guided decisions",
    items: [
      "Leveraging analytics for smarter insights",
      "Optimizing performance through intelligence",
      "Driving measurable impact",
    ],
  },
  {
    id: 4,
    title: "Grow responsibly and sustainably",
    items: [
      "Embedding sustainability in every decision",
      "Reducing environmental footprint",
      "Creating shared value for all",
    ],
  },
  {
    id: 5,
    title: "Innovate and scale",
    items: [
      "Scaling new technologies efficiently",
      "Accelerating innovation pipelines",
      "Building resilient ecosystems",
    ],
  },
  {
    id: 6,
    title: "Provide choice and access",
    items: [
      "Expanding financial inclusion",
      "Improving access to digital services",
      "Offering flexible payment options",
    ],
  },
];