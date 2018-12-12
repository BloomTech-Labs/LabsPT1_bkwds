import React from "react"
import { Link } from "react-router-dom"

//Should always display on the left
const NavigationMenu = () => (
  <div>
    <section>
      <nav>
        <ul>
          <li>
            {" "}
            <a href="/trips" class="w3-bar-item w3-button">
              Trips
            </a>
          </li>
          <li>
            <a href="/settings" class="w3-bar-item w3-button">
              Settings
            </a>{" "}
          </li>
        </ul>
      </nav>
    </section>
  </div>
)

export default NavigationMenu
