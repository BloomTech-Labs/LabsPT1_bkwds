import React, { Component } from "react"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap"

const items = [
  {
    src:
      "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1499716096/travel-backpack-man-australian-alps-MENSBACKPACK0717.jpg?itok=P-TyH9K9",
    altText: "Discover the Unknown",
    caption: "Unique Experiences ",
    header: "Discover the Unknown"
  },
  {
    src:
      "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1502309156/last-minute-travel-planning-travel-app-LMTRAVAPPS0817.jpg?itok=-flAOS7K",
    altText: "Travel Smart",
    caption: "Travel Smart",
    header: "Travel Smart"
  },
  {
    src:
      "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1459957822/Desert-Travel-Story-Sharing-APPS0416.jpg?itok=zaGgDdtq",
    altText: "Travel with Friends",
    caption: "Travel with Friends",
    header: "Travel with Friends"
  }
]

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      )
    })

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    )
  }
}

export default LandingPage
