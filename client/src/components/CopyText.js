import React from "react"
import { connect } from "react-redux"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { setPopupStatus } from "./actions/ui.js"

export class ClickText extends React.Component {
  render() {
    //multi line text
    let text = "Ross Bulat \n ross@jkrbinvestments.com"

    return (
      <CopyToClipboard
        text={text}
        onCopy={() => {
          this.props.handlePopupStatus("open", "Copied to Clipboard!")
        }}
      >
        <span>Copy Text!</span>
      </CopyToClipboard>
    )
  }
}

const mapDispatchToProps = (dispatch, tripId, ownProps) => {
  return {
    handlePopupStatus: (status, message) =>
      dispatch(setPopupStatus(status, message))
  }
  tripId: auth.user.id
}

export const ClickTextHandler = connect(
  null,
  mapDispatchToProps
)(ClickText)
