import React from "react"

import SettingsForm from "./forms/SettingsForm"
import * as s from "../styles/Settings.styles"

const Settings = () => (
  <s.SettingsStyles>
    <h3>Settings</h3>
    <SettingsForm />
  </s.SettingsStyles>
)

export default Settings
