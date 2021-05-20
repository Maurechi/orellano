import { Carousel, Image } from 'react-bootstrap';

const PicturesCarousel = () => {
  const pictures = [
    {
      image:
        'https://res.cloudinary.com/maurechi/image/upload/v1621535233/Screen_Shot_2021-05-20_at_20.25.39_t2otpj.png',
    },
    {
      image:
        'https://res.cloudinary.com/maurechi/image/upload/v1621535232/Screen_Shot_2021-05-20_at_20.25.21_pdx2lj.png',
    },
    {
      image:
        'https://res.cloudinary.com/maurechi/image/upload/v1621535233/Screen_Shot_2021-05-20_at_20.26.36_oe4jt4.png',
    },
  ];

  return (
    <Carousel fade>
      {pictures.map((picture, idx) => (
        <Carousel.Item key={idx + 1}>
          <Image
            className="carrousel-fade-img"
            src={picture.image}
            alt="macellaio"
            fluid
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PicturesCarousel;
