import React from 'react'
import NavBarr from './NavBarr'
import "bootstrap/dist/css/bootstrap.min.css";
import {Carousel}  from "react-bootstrap";
function FrontPage() {
    return (
        <div>
           <NavBarr></NavBarr>
           <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="pics/medi5.png?text=First slide&bg=373940"
      alt="First slide"  width="100%" height="420px"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="pics/medi2.png?text=Second slide&bg=282c34"
      alt="Third slide"  width="100%" height="420px"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="pics/medi4.png?text=Third slide&bg=20232a"
      alt="Third slide"
      width="100%" height="420px"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
          
        </div>
    )
}

export default FrontPage
