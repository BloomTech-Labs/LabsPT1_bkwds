import React from "react"
import moment from "moment"
import styled from "styled-components"
import PropTypes from "prop-types"

import { media } from "../../styles/theme/mixins"

const InvoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 525px;
  margin-bottom: 30px;

  ${media.phone`
    max-width: 300px;
  `}
`

const TableWrapper = styled.div`
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);

  th {
    background-color: #fafbfc;
    border-bottom: 1px solid #eaecef;
    padding: 9px;
  }

  td {
    border-bottom: 1px solid #eaecef;
    padding: 9px;
    vertical-align: top;
  }
`

const Invoices = ({ invoices }) => (
  <InvoicesContainer>
    <h4>Payment history</h4>
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(({ id, lines }) => (
            <tr key={id}>
              <td>{lines.data[0].description}</td>
              <td>
                {moment.unix(lines.data[0].period.start).format("YYYY-MM-DD")}
                {" to "}
                {moment.unix(lines.data[0].period.end).format("YYYY-MM-DD")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  </InvoicesContainer>
)

Invoices.propTypes = {
  invoices: PropTypes.array.isRequired
}

export default Invoices
