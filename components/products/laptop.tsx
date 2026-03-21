'use client';
import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useLocalStorage } from 'react-use';

import { useRouter } from 'next/navigation';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div
      className={`w-full  px-2 lg:px-5 mb-6 mx-auto group cursor-pointer hover:shadow-lg`}
    >
      <Link href={'/product/' + product.id}>
        <div className="flex flex-col justify-center items-center mb-8 ">
          <h2 className="text-2xl font-semibold text-center mb-1">
            {' '}
            {/* {product?.specifications["Model Number"] || "Others"}{" "} */}
            {product?.modelName}
          </h2>
          <hr
            className={`w-[40%] border-2 border-transparent group-hover:border-[#007E9E]`}
          />
        </div>
        <div
          className={`border border-[#007E9E] w-full mx-0 md:mx-5 group relative`}
        >
          <Image
            src={'/comingsoon.png'}
            width={80}
            height={80}
            alt="Coming Soon"
            className=" rounded-full absolute -top-4 -left-4"
          />

          <div className="w-full flex item-center justify-center pt-4">
            <Image
              src={process.env.NEXT_PUBLIC_SUPABASE_URL + product?.image}
              width={200}
              height={200}
              alt="specification"
              style={{
                height: '150px',
                widows: '150px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="w-full py-4 text-center ">
            <h3 className="text-md md:text-lg line-clamp-2">
              {' '}
              {product?.name}{' '}
            </h3>
          </div>
          <hr className="w-full border-1 border-gray-500" />
          <div className="py-4 text-center">
            <h3 className="text-lg">
              {' '}
              <span className="text-red-500 font-semibold">
                Starting From{' '}
              </span>{' '}
              Rs. .......{' '}
            </h3>
          </div>
          <hr className="w-full border-1 border-gray-500" />
          <div className="py-4 text-center">
            <h2 className="text-[#02b7e6] text-xl font-semibold flex items-center justify-center">
              {' '}
              View More{' '}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductsCarousel = ({ products }: { products: any[] }) => {
  const [slider1] = [useRef<any>(null)];

  const memoizedSettings = useMemo(() => {
    return {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: products?.length > 2 ? 3 : products?.length > 1 ? 2 : 1,
      slidesToScroll: 1,
      autoPlay: false, //true,
      focusOnSelect: true,
      arrows: false,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              products?.length > 2 ? 3 : products?.length > 1 ? 2 : 1,
            slidesToScroll:
              products?.length > 2 ? 3 : products?.length > 1 ? 2 : 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: products?.length > 1 ? 2 : 1,
            slidesToScroll: products?.length > 1 ? 2 : 1,
            initialSlide: products?.length > 1 ? 2 : 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, [products]);

  return (
    <div className="mt-0 md:mt-12 mb-0 md:mb-10 w-full ">
      <div className="mt-0 md:mt-8 w-full">
        <Slider {...memoizedSettings} ref={slider1}>
          {products.map((product, i) => (
            <div key={product.id}>
              {' '}
              <ProductCard product={product} />{' '}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const Laptop = ({ product, relatedProducts }: { product: any, relatedProducts: any[] }) => {
  const [active, setActive] = useState('1');
  const [showModal, setShowModal] = useState(true);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [cart, setCart, removeFromCart] = useLocalStorage<any[]>('cart', []);
  const router = useRouter();

  // console.log(cart)

  const addToCart = (e: any, product: any) => {
    // e.preventDefault()
    // toast.dismiss()
    // toast.loading('Adding to cart...', { type: 'info', theme: 'colored' })
    // console.log(cart)
    // console.log('product', product)
    // const exist = cart.find((x) => x.slug === product.slug)
    // if (!exist) {
    //   setCart([...cart, { slug: product.slug, quantity: 1 }])
    //   router.push('/cart')
    // } else {
    //   router.push('/cart')
    //   toast.dismiss()
    //   // toast.error('Product already in cart', { theme: 'colored' })
    // }
  };

  const handleCheckout = (e: any) => {
    e.preventDefault();
    setCart([...(cart || []), { slug: product.slug, quantity: 1 }]);
    router.push('/checkout');
  };

  const handleclick = (e: any) => {
    setActive(e.target.id);
    setShowModal(true);
    setShowModal1(false);
    setShowModal2(false);
  };

  const handleclick1 = (e: any) => {
    setActive(e.target.id);
    setShowModal(false);
    setShowModal1(true);
    setShowModal2(false);
  };
  const handleclick2 = (e: any) => {
    setActive(e.target.id);
    setShowModal(false);
    setShowModal2(true);
    setShowModal1(false);
  };
  return (
    <main className={``}>
      {/* <Navbar /> */}
      <div className="w-full py-10 md:py-14 text-white">
        <div className="flex pl-6 lg:pl-28 pr-4">
          <div className="w-full lg:w-[50%] pt-0 lg:pt-14">
            <h1 className="text-xl md:text-4xl text-left pb-2 md:pb-4">
              {' '}
              {product.name}{' '}
            </h1>
            <p className="text-sm md:text-lg py-0 pr-0 md:pr-10 pb-4 md:pb-6">
              {product.description ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'}
            </p>
            <div className="flex flex-col ">
              <div className="w-full md:w-[60%] rounded-lg p-4 hover:scale-105 hover:shadow-mission transition duration-150 ease-in-out border-2 border-[#007E9E] ">
                <h3 className="text-md md:text-2xl pb-2 ">Variant :</h3>
                <div className="text-sm md:text-base">
                  {product.variants?.map((variant: any, index: number) => (
                    <div
                      key={'var' + index}
                      className="bg-[#132039] rounded-lg p-4 mt-2 hover:shadow-mission transition duration-150 ease-in-out    "
                    >
                      <p className="font-semibold  px-4 my-4 md:my-4 text-left text-gray-200   leading-6 md:leading-10 border-b border-gray-200">
                        {variant?.productType || ''} asdf asdf asdf a
                      </p>
                      <p className=" px-4 pl-6 lg:pl-10 my-2 md:my-4 text-left leading-6 md:leading-10 pr-4 md:pr-10 border-b border-gray-200">
                        Rs. {variant?.price || '---'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-[60%] mb-4 md:mb-10">
                <button
                  onClick={(e) => addToCart(e, { slug: product.id })}
                  className="bg-[#007E9E] text-sm md:text-lg px-6 py-2 rounded-md mt-2 md:mt-6 "
                >
                  Add to Cart
                </button>
                <button className="bg-red-500 text-sm md:text-lg px-6 py-2 rounded-md mt-6 ml-2 md:ml-4">
                  Coming Soon
                </button>
              </div>
            </div>
            {/* </Link> */}
          </div>
          <div className="flex items-right justify-end w-[40%] mx-auto md:-mt-10 ">
            <Image
              src={process.env.NEXT_PUBLIC_SUPABASE_URL + product?.image}
              width={300}
              height={200}
              alt="specification"
              className=" w-full h-40 md:h-full pl-0 md:pl-0"
            />
          </div>
        </div>

        <div className="block  w-full flex  px-10 md:px-28 gap-4 md:gap-10 text-lg md:text-3xl text-left mt-10 lg:mt-0">
          <button
            className={
              active === '1'
                ? 'border-b-4 border-[#007E9E] pb-2'
                : 'border-b-4 border-[#000F29] pb-2'
            }
            onClick={handleclick}
            id={'1'}
          >
            Technical Specification
          </button>

          <button
            className={
              active === '2'
                ? 'border-b-4 border-[#007E9E] pb-2'
                : 'border-b-4 border-[#000F29] pb-2'
            }
            onClick={handleclick2}
            id={'2'}
          >
            Features
          </button>

          <button
            className={
              active === '3'
                ? 'border-b-4 border-[#007E9E] pb-2'
                : 'border-b-4 border-[#000F29] pb-2'
            }
            onClick={handleclick1}
            id={'3'}
          >
            Look At Me
          </button>
        </div>

        {showModal ? (
          <div className="w-full  pt-10 md:pt-14 ">
            <div className="w-full md:w-[80%] mx-auto px-10 md:px-0 ">
              <table className="text-lg text-center ">
                <tbody className="w-full lg:w-[50%] text-sm md:text-[24px]">
                  {product.technicalSpecifications.map(
                    (specification: any, index: number) => (
                      <tr
                        className="bg-[#132039] rounded-lg p-4  hover:shadow-mission transition duration-150 ease-in-out  border-2 border-[#007E9E] "
                        key={'spec-' + index}
                      >
                        <td className="w-[20%]  border-r-2 border-[#D9D9D94D] font-semibold  px-4 py-4 md:py-4 text-left text-gray-200   leading-6 md:leading-10">
                          {specification.name || ''}
                        </td>
                        <td className="w-[40%]  px-4 pl-6 lg:pl-10 py-2 md:py-4 text-left leading-6 md:leading-10">
                          {specification.value || '---'}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* <div className="flex items-center justify-center  " id="pdf">
              <a href={product.pdf} target="_blank" rel="noreferrer">
                <div
                  className="flex items-center justify-center  pt-6 md:pt-10"
                  id="pdf"
                >
                  <button className=" text-center bg-[#007E9E] text-white  px-4  text-sm md:text-lg py-2 rounded-md">
                    PDF To Download{" "}
                    <i className="material-icons pl-2 text-[16px] text-white">
                      file_download
                    </i>
                  </button>
                </div>{" "}
              </a>
            </div> */}
            <div className="w-full md:w-[80%] mx-auto px-10 md:px-0   pt-10 md:pt-20 pb-10">
              <h1 className="text-2xl md:text-4xl text-left pb-6 ">
                Products related to this item
              </h1>
              <ProductsCarousel products={relatedProducts} />

              <h3>Joseph</h3>
            </div>
          </div>
        ) : null}
        {/*-----------------------------------Features-----------------------------------------*/}
        {showModal2 ? (
          <div className="w-full px-10 md:px-28 pt-10">
            <div className="flex items-center justify-center pt-10 md:pt-14">
              {!!product?.featureVideoLink ? (
                <iframe
                  className="border border-color:blue rounded-md"
                  key={'product-video-'}
                  width="1200"
                  height="1000"
                  src={`https://www.youtube.com/embed/${product?.featureVideoLink}`}
                  title={`YouTube video player`}
                  frameBorder="0"
                  allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                ''
              )}
            </div>
            <div className="flex items-center justify-center  " id="pdf">
              {/* <a href={product.pdf} target="_blank" rel="noreferrer">
                <div
                  className="flex items-center justify-center  pt-6 md:pt-10"
                  id="pdf"
                >
                  <button className=" text-center bg-[#007E9E] text-white  px-4  text-sm md:text-lg py-2 rounded-md">
                    PDF To Download{" "}
                    <i className="material-icons pl-2 text-[16px] text-white">
                      file_download
                    </i>
                  </button>
                </div>{" "}
              </a> */}
            </div>
          </div>
        ) : null}
        {/*-----------------------------------Look At me---------------------------------------*/}
        {showModal1 ? (
          <div className="w-full px-10 lg:px-28 pt-10 pb-0 mt-6">
            <div className="flex flex-col md:flex-row lg:flex-wrap gap-5 items-center justify-center relative  w-full md:w-fullscreen lg:w-full overflow-x-hidden md:pl-0 lg:pl-0">
              {product.lookupImages.map((img: any, index: number) => (
                <>
                  <figure className="img-hover-zoom">
                    <Image
                      src={img}
                      width={300}
                      height={150}
                      alt="specification"
                      loading="lazy"
                      key={'product-img-' + index}
                    />
                  </figure>
                </>
              ))}
            </div>

            {/*}  <div className='mt-40 ' style={{width:'342px',height:'513px'}}>
               
                    <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg300
    },
    largeImage: {
        src: watchImg1200,
        width: 1200,
        height: 934
    }
}} /></div>*/}
          </div>
        ) : null}
      </div>

      {/* <Footer /> */}
    </main>
  );
};

export default Laptop;
