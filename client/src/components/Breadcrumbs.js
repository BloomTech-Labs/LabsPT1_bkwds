import React from "react"
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"
import Breadcrumb from "./Breadcrumb"

const BreadcrumbsStyles = styled.div`
  background-color: ${props => props.theme.lighterGray};
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  .current-path {
    cursor: default;
    color: ${props => props.theme.midGray};
    &:hover {
      text-decoration: none;
    }
  }

  ol {
    display: flex !important;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li a {
    background-color: orange;
    color: purple;
  }

  li + li {
    margin-right: 10px;
    a {
      margin-left: 10px;
    }
  }

  /* li {
    &:not(:first-child) a::before {
      content: "\003E";
    }
    &:first-child {
      margin-right: 10px;
    }
    & + li {
      margin-right: 10px;
      a {
        margin-left: 10px;
      }
    }
  } */
`

const head = t => t[0]
const tail = t => t.slice(1)
const titlecase = s => head(s).toUpperCase() + tail(s)
const splitPathname = pathname => tail(pathname.split("/"))
const buildPath = pathsArray => index =>
  "/" + pathsArray.slice(0, index + 1).join("/")

const Breadcrumbs = ({ location }) => {
  const paths = splitPathname(location.pathname)
  const buildPathByIndex = buildPath(paths)

  return (
    <BreadcrumbsStyles id="breadcrumb-styles">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {paths.map((path, i, arr) => (
          <Breadcrumb
            key={i}
            linkpath={buildPathByIndex(i)}
            name={titlecase(path)}
            last={i + 1 === arr.length ? true : false}
          />
        ))}
      </ol>
    </BreadcrumbsStyles>
  )
}

Breadcrumbs.propTypes = {
  location: PropTypes.string.isRequired
}

export default withRouter(Breadcrumbs)
