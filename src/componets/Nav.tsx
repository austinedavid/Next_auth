import styles from "./nav.module.css"
import React from 'react'
import Link from "next/link"



const Nav = () => {
  return (
    <nav>
        <ul className={styles.parent}>
            <li className={styles.li}><Link className={styles.a} href="/">home</Link></li>
            <li className={styles.li}><Link className={styles.a} href="/server">server</Link></li>
            <li className={styles.li}><Link className={styles.a} href="/client">client</Link></li>
            <li className={styles.li}><Link className={styles.a} href="/middleware">middleware</Link></li>
            <li className={styles.li}><Link className={styles.a} href="/public">public</Link></li>
        </ul>
    </nav>
  )
}

export default Nav