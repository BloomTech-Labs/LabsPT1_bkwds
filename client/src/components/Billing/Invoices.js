import React from "react"
import moment from "moment"

const Invoices = ({ invoices }) => (
  <>
    <h4>Payment history</h4>
    <table>
      <tr>
        <th>Service</th>
        <th>Period</th>
      </tr>
      {invoices.map(invoice => (
        <tr key={invoice.id}>
          <td>{invoice.lines.data[0].description}</td>
          <td>
            {moment
              .unix(invoice.lines.data[0].period.start)
              .format("YYYY-MM-DD")}
            {" to "}
            {moment.unix(invoice.lines.data[0].period.end).format("YYYY-MM-DD")}
          </td>
        </tr>
      ))}
    </table>
  </>
)

export default Invoices
