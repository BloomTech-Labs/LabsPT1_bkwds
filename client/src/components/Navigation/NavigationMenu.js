import React from "react"
import { Link } from "react-router-dom"
import "./NavigationMenu.css"

//Should always display on the left
const NavigationMenu = () => (
  <div>
    <section>
      <nav>
        <ul>
          <li>
            {" "}
            <a href="/trips">Trips</a>
          </li>
          <li>
            <a href="/settings">Settings</a>{" "}
          </li>
        </ul>
      </nav>
    </section>
  </div>
)

export default NavigationMenu
