import React from "react"

import SettingsForm from "./forms/SettingsForm"
import * as s from "../styles/Settings.styles"

const Settings = () => (
  <s.SettingsStyles>
    <h4>Change email / password</h4>
    <SettingsForm />
  </s.SettingsStyles>
)

export default Settings
