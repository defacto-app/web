import Image from "next/image";
import React from "react";

const navigation = {

  support: [
    { name: "Delivery", href: "#" },
    { name: "Customers", href: "#" },
    { name: "Drivers", href: "#" },
    { name: "Riders", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Be a Rider/Driver", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
  legal: [
    { name: "License Agreement", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms of Use", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      image: "footer/facebook.png",
    },
    {
      name: "Whatsapp",
      href: "#",
      image: "footer/whatsapp.png",
    },
    {
      name: "X",
      href: "#",
      image: "/footer/twitter.png",
    },
  ],
};

export default function Footer() {
  return (
    <div className="bg-slate-900" aria-labelledby="footer-heading">
      <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between"></div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="">
                {/* <img src=""
               alt=""
                width={1824}
                height={1080}/> */}
                <svg
                  width="201"
                  height="202"
                  viewBox="0 0 301 272"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M292.593 5.38177C289.536 2.74218 285.815 0.989221 281.833 0.312733C277.852 -0.363755 273.761 0.0620079 270.003 1.54392L14.0745 102.088C9.61361 103.84 5.84011 106.99 3.31865 111.066C0.797187 115.142 -0.336654 119.925 0.0867834 124.699C0.510221 129.473 2.46817 133.982 5.66766 137.55C8.86714 141.119 13.1361 143.555 17.8359 144.495L82.8437 157.497V238.695C82.84 243.084 84.139 247.377 86.5764 251.028C89.0137 254.679 92.4798 257.525 96.5355 259.205C100.591 260.885 105.054 261.323 109.36 260.465C113.665 259.607 117.618 257.49 120.72 254.383L156.696 218.408L211.299 266.459C215.32 270.028 220.507 272.003 225.884 272.01C228.221 272.007 230.543 271.639 232.767 270.918C236.433 269.755 239.731 267.651 242.331 264.815C244.931 261.98 246.742 258.512 247.583 254.758L299.743 27.1522C300.651 23.2165 300.465 19.1072 299.204 15.2697C297.944 11.4322 295.658 8.01274 292.593 5.38177ZM225.956 249.802L111.701 149.257L276.228 30.4328L225.956 249.802Z"
                    fill="#1C1C1C"
                  />
                </svg>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm leading-6 text-primary-600 font-semibold">
                  Services
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm leading-6 text-primary-600 font-semibold">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm leading-6 text-primary-600 font-semibold">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-gray-400"
              >
                <span className="sr-only">{item.name}</span>
                <span>
                  <Image src={item.image} className="w-5 h-5" alt="" />
                </span>
              </a>
            ))}
          </div>
          <svg
            width="139"
            height="67"
            viewBox="0 0 139 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_786_787)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.7357 2.86509C30.096 3.80333 29.8082 8.41989 29.8082 9.31282C29.8082 11.5998 29.5123 14.2759 29.6749 16.5042C29.6749 16.5149 29.6749 16.5282 29.6749 16.5389L29.6163 33.6804C29.6163 33.6804 29.6163 33.707 29.6163 33.7177C29.8695 36.9482 29.1471 39.0326 27.5878 40.8931C26.6443 42.0179 26.3564 42.0926 24.989 42.8682C23.4377 43.7505 23.5337 43.6385 21.7532 44.0677C21.6999 44.081 21.6466 44.1023 21.6012 44.129C21.6012 44.129 21.5986 44.129 21.5959 44.1316C21.4307 44.2303 21.332 44.4062 21.332 44.5981L21.3907 55.1026C21.3907 55.4012 21.6359 55.6384 21.9344 55.6411C27.8064 55.6624 32.4656 52.5758 35.275 49.9476C35.4269 49.8037 35.6482 49.7611 35.8428 49.8384L40.494 51.6669C48.9488 55.3052 56.8572 58.3918 65.4666 61.6943C68.6918 63.019 75.0836 65.5166 79.0417 66.2416C79.6202 66.3482 79.924 65.5805 79.4309 65.2553C78.5753 64.6903 77.5598 64.1705 77.0053 63.864C73.2097 61.7609 68.9024 59.8178 64.9175 57.864L48.6902 50.0836C48.6902 50.0836 48.6662 50.0729 48.6556 50.0676C46.931 49.4146 45.4277 48.4417 43.7938 47.7566C41.3256 46.7225 40.9231 46.3813 39.3585 45.6269C39.1239 45.5123 38.9987 45.2485 39.0706 44.9979C39.3718 43.945 40.374 41.7327 40.7792 39.7283C41.4802 36.2659 41.1497 15.6353 41.1497 10.0298C41.1497 7.57494 41.4562 5.05342 40.39 3.16628C38.2523 -0.613329 32.5296 -0.658642 30.7251 2.86509"
                fill="#1067F5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99745 43.5876C5.37991 51.0749 12.542 55.87 21.3993 55.6301L21.3353 44.3206C21.5192 44.1767 21.4473 44.222 21.6765 44.086C13.4749 45.1336 8.53847 35.5912 13.6162 29.3168C18.414 23.3861 28.2575 25.8703 29.6169 33.6988L29.6755 16.5199C28.8839 16.3067 27.9003 15.8402 26.9994 15.5497C23.9368 14.5608 20.645 14.2969 17.4198 14.7927C6.55004 16.4719 -0.993188 26.5127 0.192939 37.3451C0.448822 39.6614 1.04055 41.4659 1.99745 43.5903"
                fill="#1067F5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.8419 27.1019C15.7051 27.6137 12.2027 30.9988 12.6558 35.9059C13.0609 40.2932 16.8192 43.5531 21.609 43.0893C25.8311 42.6788 29.099 38.7686 28.5819 34.1067C28.1341 30.0526 24.3065 26.5528 19.8419 27.1019Z"
                fill="#1067F5"
              />
              <path
                d="M61.0208 37.9826C60.8742 38.9821 60.5197 39.8964 59.96 40.7253C59.3976 41.5543 58.7099 42.2633 57.8943 42.847C57.076 43.4334 56.1697 43.8892 55.1675 44.2197C54.168 44.5502 53.1311 44.7128 52.0569 44.7128C50.7882 44.7128 49.5887 44.4863 48.4532 44.0358C47.3204 43.5853 46.3369 42.951 45.5079 42.1327C44.679 41.3144 44.0206 40.3468 43.5328 39.2247C43.045 38.1025 42.7998 36.8711 42.7998 35.5303C42.7998 34.1896 43.0424 32.9502 43.5328 31.8174C44.0206 30.6846 44.679 29.709 45.5079 28.8907C46.3369 28.0751 47.3177 27.4407 48.4532 26.9876C49.586 26.5371 50.7882 26.3105 52.0569 26.3105C53.3976 26.3105 54.6184 26.5105 55.7166 26.9129C56.8148 27.3154 57.7583 27.8885 58.5526 28.6322C59.3443 29.3758 59.9733 30.2794 60.4371 31.3403C60.9009 32.4011 61.1435 33.5899 61.1701 34.9066V36.5885H47.2671C47.4857 37.7827 48.0401 38.7236 48.933 39.4059C49.8233 40.0883 50.8655 40.4294 52.0623 40.4294C52.9898 40.4294 53.8374 40.2162 54.6051 39.7897C55.3727 39.3633 55.9511 38.7609 56.343 37.9799H61.0262L61.0208 37.9826ZM56.1564 33.1181C55.7912 32.3371 55.2475 31.7214 54.5278 31.271C53.8081 30.8205 52.9845 30.5939 52.0569 30.5939C51.1293 30.5939 50.2471 30.8205 49.4768 31.271C48.7091 31.7214 48.1174 32.3371 47.7016 33.1181H56.1537H56.1564Z"
                fill="#1067F5"
              />
              <path
                d="M71.667 28.3975V32.6036H67.5702V44.4195H63.1802V32.6036H62.082V28.3975H63.1802V27.9577C63.1802 25.7374 63.7586 23.9942 64.9181 22.7254C66.0749 21.4566 67.7035 20.8223 69.8012 20.8223H72.2161V25.0284H70.3876C69.412 25.0284 68.6977 25.2602 68.2472 25.724C67.7968 26.1878 67.5702 26.9315 67.5702 27.955V28.3948H71.667V28.3975Z"
                fill="#1067F5"
              />
              <path
                d="M86.6685 42.3723C85.9115 43.1533 85.0532 43.7397 84.0883 44.1289C83.1234 44.518 82.1185 44.7153 81.071 44.7153C79.8502 44.7153 78.7041 44.4887 77.6326 44.0382C76.5584 43.5878 75.6255 42.9534 74.8339 42.1351C74.0422 41.3168 73.4185 40.3493 72.968 39.2271C72.5176 38.105 72.291 36.8735 72.291 35.5328C72.291 34.1921 72.5149 32.9526 72.968 31.8198C73.4185 30.687 74.0422 29.7114 74.8339 28.8931C75.6255 28.0775 76.5584 27.4431 77.6326 26.99C78.7068 26.5396 79.8529 26.313 81.071 26.313C82.1185 26.313 83.1208 26.5076 84.0697 26.8994C85.0212 27.2885 85.8742 27.8643 86.6311 28.6186V26.4969H91.0211V44.4247H86.9963L86.6658 42.375L86.6685 42.3723ZM86.6311 35.5301C86.6311 34.7491 86.4979 34.0535 86.2287 33.4457C85.9595 32.8353 85.5996 32.3129 85.1492 31.8731C84.6987 31.4333 84.1603 31.1001 83.5392 30.8682C82.9182 30.6364 82.2518 30.5217 81.5455 30.5217C80.8391 30.5217 80.2154 30.639 79.6077 30.8682C78.9973 31.1001 78.4669 31.436 78.0164 31.8731C77.5659 32.3129 77.2114 32.838 76.9556 33.4457C76.6997 34.0561 76.5717 34.7518 76.5717 35.5301C76.5717 36.3084 76.6997 36.9695 76.9556 37.5799C77.2114 38.1902 77.5659 38.7127 78.0164 39.1525C78.4669 39.5923 78.9973 39.9281 79.6077 40.1574C80.2181 40.3892 80.8631 40.5039 81.5455 40.5039C82.2278 40.5039 82.9182 40.3892 83.5392 40.1574C84.1603 39.9255 84.696 39.5896 85.1492 39.1525C85.5996 38.7127 85.9595 38.1902 86.2287 37.5799C86.4979 36.9695 86.6311 36.2871 86.6311 35.5301Z"
                fill="#1067F5"
              />
              <path
                d="M105.654 34.0324C105.385 32.9582 104.855 32.1186 104.063 31.5082C103.271 30.8978 102.325 30.594 101.227 30.594C100.544 30.594 99.9048 30.7113 99.3051 30.9405C98.708 31.1724 98.1882 31.5029 97.7511 31.9294C97.3113 32.3558 96.9648 32.8676 96.7089 33.4647C96.453 34.0617 96.3251 34.7387 96.3251 35.4957C96.3251 36.2527 96.453 36.9351 96.7089 37.5455C96.9648 38.1559 97.3113 38.673 97.7511 39.0994C98.1909 39.5259 98.708 39.8564 99.3051 40.0883C99.9021 40.3202 100.542 40.4348 101.227 40.4348C102.349 40.4348 103.306 40.123 104.098 39.5019C104.889 38.8809 105.433 38.0093 105.726 36.8871H110.153C110.055 38.0572 109.751 39.1181 109.239 40.0697C108.727 41.0212 108.069 41.8448 107.264 42.5405C106.459 43.2362 105.54 43.772 104.503 44.1505C103.466 44.529 102.373 44.7182 101.227 44.7182C99.9581 44.7182 98.7586 44.4916 97.6232 44.0412C96.4903 43.5907 95.5068 42.9563 94.6778 42.138C93.8489 41.3198 93.1905 40.3522 92.7027 39.23C92.2149 38.1079 91.9697 36.8764 91.9697 35.5357C91.9697 34.195 92.2123 32.9556 92.7027 31.8227C93.1905 30.6899 93.8489 29.7144 94.6778 28.8961C95.5068 28.0804 96.4877 27.4461 97.6232 26.9929C98.756 26.5425 99.9581 26.3159 101.227 26.3159C102.397 26.3159 103.5 26.5105 104.537 26.9023C105.574 27.2915 106.488 27.8246 107.28 28.4936C108.072 29.1653 108.719 29.9703 109.221 30.9085C109.719 31.8467 110.02 32.8649 110.116 33.9631L105.651 34.0351L105.654 34.0324Z"
                fill="#1067F5"
              />
              <path
                d="M111.104 26.4947H112.203L112.568 22.5791H116.593V26.4947H119.591V30.7007H116.593V37.543C116.593 38.5185 116.777 39.2089 117.142 39.6087C117.507 40.0112 118.141 40.2111 119.045 40.2111H119.778V44.4172H118.461C116.435 44.4172 114.887 43.8254 113.815 42.642C112.741 41.4585 112.205 39.7579 112.205 37.5376V30.6954H111.107V26.4893L111.104 26.4947Z"
                fill="#1067F5"
              />
              <path
                d="M119.85 35.5328C119.85 34.1921 120.092 32.9526 120.583 31.8198C121.07 30.687 121.729 29.7114 122.558 28.8931C123.387 28.0775 124.368 27.4431 125.503 26.99C126.636 26.5396 127.838 26.313 129.107 26.313C130.375 26.313 131.564 26.5396 132.673 26.99C133.782 27.4405 134.757 28.0749 135.6 28.8931C136.442 29.7114 137.106 30.687 137.594 31.8198C138.081 32.9526 138.327 34.1921 138.327 35.5328C138.327 36.8735 138.081 38.105 137.594 39.2271C137.106 40.3493 136.442 41.3195 135.6 42.1351C134.757 42.9534 133.782 43.5878 132.673 44.0382C131.562 44.4887 130.373 44.7153 129.107 44.7153C127.841 44.7153 126.639 44.4887 125.503 44.0382C124.37 43.5878 123.387 42.9534 122.558 42.1351C121.729 41.3168 121.07 40.3493 120.583 39.2271C120.095 38.105 119.85 36.8735 119.85 35.5328ZM124.202 35.4955C124.202 36.2525 124.33 36.9348 124.586 37.5452C124.842 38.1556 125.189 38.6727 125.628 39.0992C126.068 39.5256 126.585 39.8562 127.182 40.088C127.779 40.3199 128.419 40.4346 129.104 40.4346C129.789 40.4346 130.383 40.3199 130.97 40.088C131.556 39.8562 132.068 39.5283 132.505 39.0992C132.945 38.6727 133.291 38.1556 133.547 37.5452C133.803 36.9348 133.931 36.2525 133.931 35.4955C133.931 34.7385 133.803 34.0641 133.547 33.4644C133.291 32.8673 132.945 32.3556 132.505 31.9291C132.065 31.5026 131.554 31.1748 130.97 30.9402C130.383 30.7083 129.762 30.5937 129.104 30.5937C128.446 30.5937 127.782 30.711 127.182 30.9402C126.585 31.1721 126.065 31.5026 125.628 31.9291C125.189 32.3556 124.842 32.8673 124.586 33.4644C124.33 34.0615 124.202 34.7385 124.202 35.4955Z"
                fill="#1067F5"
              />
              <path
                d="M87.8799 52.8392L88.6902 47.7056H89.3219L90.3801 52.0503L92.795 47.7056H93.4907L92.675 52.8392H92.022L92.3765 50.6029C92.4964 49.8646 92.5897 49.3875 92.6617 49.0916L90.6013 52.8419H89.9616L89.074 49.1076C89.066 49.3848 88.9967 49.9659 88.8901 50.6136L88.5356 52.8446H87.8826L87.8799 52.8392Z"
                fill="white"
              />
              <path
                d="M93.8105 51.9944C93.8105 51.2907 94.3356 50.8509 95.2526 50.7736L96.3401 50.6883L96.3534 50.595C96.4467 50.0779 96.1828 49.7927 95.6364 49.7927C95.09 49.7927 94.8048 50.0193 94.7355 50.4671H94.1464C94.2663 49.7074 94.8288 49.2729 95.695 49.2729C96.6173 49.2729 97.1157 49.806 96.9798 50.651L96.6306 52.8393H96.0762L96.1055 52.2716C95.8709 52.6767 95.3805 52.9246 94.8421 52.9246C94.2237 52.9246 93.8132 52.5568 93.8132 51.9944H93.8105ZM96.2468 51.3333L96.2761 51.1494L95.3885 51.2214C94.7648 51.272 94.4582 51.5279 94.4582 51.9384C94.4582 52.2369 94.6848 52.4208 95.0686 52.4208C95.6924 52.4208 96.1481 52.0024 96.2468 51.3333Z"
                fill="white"
              />
              <path
                d="M97.6465 52.8393L98.4701 47.6123H99.1098L98.5714 51.0001L100.347 49.3662H101.162L99.6216 50.7949L100.573 52.8393H99.8775L99.1311 51.2133L98.4435 51.845L98.2862 52.8393H97.6465Z"
                fill="white"
              />
              <path
                d="M101.077 51.376C101.077 50.1899 101.901 49.2729 102.972 49.2729C103.958 49.2729 104.534 49.982 104.38 50.9762L104.345 51.2187L101.704 51.2267V51.3413C101.704 51.9864 102.053 52.3862 102.626 52.3862C103.082 52.3862 103.463 52.1596 103.62 51.7678H104.26C104.025 52.4768 103.364 52.9246 102.604 52.9246C101.682 52.9246 101.077 52.3142 101.077 51.376ZM101.781 50.7949H103.769C103.863 50.2059 103.521 49.814 102.946 49.814C102.37 49.814 101.951 50.2112 101.781 50.7949Z"
                fill="white"
              />
              <path
                d="M106.888 52.8393L107.711 47.6123H108.351L107.527 52.8393H106.888Z"
                fill="white"
              />
              <path
                d="M109.132 49.3663H109.763L109.217 52.8394H108.577L109.132 49.3663ZM109.209 48.1669C109.209 47.903 109.443 47.6631 109.707 47.6631C109.921 47.6631 110.07 47.8203 110.07 48.0256C110.07 48.2895 109.835 48.5294 109.579 48.5294C109.366 48.5294 109.209 48.3721 109.209 48.1669Z"
                fill="white"
              />
              <path
                d="M110.933 49.3662L111.026 48.8064C111.146 48.0254 111.581 47.6123 112.276 47.6123C112.412 47.6123 112.561 47.6203 112.665 47.6416L112.58 48.196C112.487 48.196 112.401 48.188 112.29 48.188C111.914 48.188 111.722 48.3666 111.658 48.8064L111.565 49.3662H112.375L112.29 49.9073H111.479L111.018 52.8393H110.386L110.848 49.9073H110.344L110.429 49.3662H110.933Z"
                fill="white"
              />
              <path
                d="M112.438 51.376C112.438 50.1899 113.262 49.2729 114.334 49.2729C115.32 49.2729 115.896 49.982 115.741 50.9762L115.706 51.2187L113.065 51.2267V51.3413C113.065 51.9864 113.414 52.3862 113.987 52.3862C114.443 52.3862 114.824 52.1596 114.981 51.7678H115.621C115.386 52.4768 114.725 52.9246 113.966 52.9246C113.044 52.9246 112.438 52.3142 112.438 51.376ZM113.142 50.7949H115.131C115.224 50.2059 114.883 49.814 114.307 49.814C113.731 49.814 113.313 50.2112 113.142 50.7949Z"
                fill="white"
              />
              <path
                d="M118.251 51.376C118.251 50.1899 119.075 49.2729 120.146 49.2729C121.132 49.2729 121.708 49.982 121.553 50.9762L121.519 51.2187L118.877 51.2267V51.3413C118.877 51.9864 119.227 52.3862 119.8 52.3862C120.255 52.3862 120.637 52.1596 120.794 51.7678H121.434C121.199 52.4768 120.538 52.9246 119.778 52.9246C118.856 52.9246 118.251 52.3142 118.251 51.376ZM118.955 50.7949H120.943C121.036 50.2059 120.695 49.814 120.119 49.814C119.544 49.814 119.125 50.2112 118.955 50.7949Z"
                fill="white"
              />
              <path
                d="M122.009 51.9944C122.009 51.2907 122.534 50.8509 123.451 50.7736L124.538 50.6883L124.552 50.595C124.645 50.0779 124.381 49.7927 123.835 49.7927C123.288 49.7927 123.003 50.0193 122.934 50.4671H122.345C122.465 49.7074 123.027 49.2729 123.893 49.2729C124.816 49.2729 125.314 49.806 125.178 50.651L124.829 52.8393H124.274L124.304 52.2716C124.069 52.6767 123.579 52.9246 123.04 52.9246C122.422 52.9246 122.011 52.5568 122.011 51.9944H122.009ZM124.445 51.3333L124.474 51.1494L123.587 51.2214C122.963 51.272 122.656 51.5279 122.656 51.9384C122.656 52.2369 122.883 52.4208 123.267 52.4208C123.891 52.4208 124.346 52.0024 124.445 51.3333Z"
                fill="white"
              />
              <path
                d="M126.305 51.8449C126.313 52.1914 126.59 52.4206 127.009 52.4206C127.427 52.4206 127.739 52.1994 127.739 51.8875C127.739 51.645 127.632 51.5197 127.334 51.4184L126.758 51.2265C126.276 51.0639 126.012 50.7707 126.012 50.3256C126.012 49.6939 126.529 49.2754 127.318 49.2754C128.056 49.2754 128.525 49.7019 128.525 50.3549H127.902C127.894 49.9711 127.68 49.7792 127.278 49.7792C126.875 49.7792 126.633 49.9631 126.633 50.2749C126.633 50.5015 126.769 50.6588 127.065 50.7654L127.632 50.9573C128.136 51.1279 128.363 51.3971 128.363 51.8316C128.363 52.4926 127.816 52.9244 126.971 52.9244C126.204 52.9244 125.679 52.4926 125.679 51.8449H126.302H126.305Z"
                fill="white"
              />
              <path
                d="M128.373 53.8548H128.8C129.077 53.8548 129.346 53.7909 129.567 53.3644L129.773 52.9726L128.984 49.3662H129.629L130.183 52.1703L131.633 49.3662H132.329L130.05 53.6203C129.773 54.1374 129.418 54.4519 128.835 54.4519C128.613 54.4519 128.445 54.4306 128.288 54.3879L128.373 53.8548Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_786_787">
                <rect
                  width="138.254"
                  height="65.9779"
                  fill="white"
                  transform="translate(0.0703125 0.274414)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
