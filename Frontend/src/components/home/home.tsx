import Footer from '../footer/footer'

import tagDiscount from  '../../assets/svg/tag-discount.svg'
import FreeTaxBanner from '../../assets/images/banners/ifoodCopyImage.png'

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col flex-1 divide-y divide-y-">
        <div className="h-16 w-full bg-green-600 text-white flex">
          <div className="m-auto px-4 flex items-center gap-4">
            <img src={tagDiscount} className="w-8 h-full" alt="" />
            <h4 className="font-medium">
              Você tem 67 cupons! Aproveite seus descontos!
            </h4>
          </div>
        </div>
        <main className="w-4/5 mx-auto drop-shadow-md">
          <div className="banners w-full max-w-[1500px] h-[760px] sm:h-[210px] lg:h-[90px] xl:h-[190px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-2">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className="w-full bg-black h-full rounded-lg bg-center bg-cover bg-no-repeat hover:scale-105 duration-300"
                  style={{ backgroundImage: `url('${FreeTaxBanner}')` }}
                ></span>
              ))}
          </div>

          <div className="w-full p-4 mt-10 h-fit grid gap-4">
            <span className="w-full flex items-center justify-between px-">
              <h4 className="text-xl font-medium text-secondary">
                Últimas Lojas
              </h4>
              <a className="text-base text-red-600" href="#">
                Ver mais
              </a>
            </span>
            <div className="cards grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
              <div className="card rounded-lg shadow hover:shadow-xl duration-300 flex items-center p-2">
                <div className="h-full mx-auto flex w-full gap-4 justify-center items-center">
                  <div
                    className="w-[70px] h-[70px] rounded-xl bg-red-600 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9638eeb8-e311-4948-a0fd-e949c51ee9e0/202305111331_bfQC_i.jpg?imwidth=256')`,
                    }}
                  ></div>
                  <h3>Divino Fogão</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 mt-10 h-fit grid gap-4">
            <span className="w-full flex items-center justify-between px-">
              <h4 className="text-xl font-medium text-secondary">
                Bom e Barato
              </h4>
              <a className="text-base text-red-600" href="#">
                Ver mais
              </a>
            </span>
            <div className="cards grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>

              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>

              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>

              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>

              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>
              <div className="p-2 card rounded-lg shadow hover:shadow-xl hover:drop-shadow-lgl duration-300 hover:scale-105">
                <img
                  className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://static.ifood-static.com.br/image/upload/t_medium/pratos/fa37d76e-4dca-426d-872e-9660ef70329c/202108121726_1PCB_i.jpg')`,
                  }}
                />
                <p className="name text-secondary font-medium pt-2">
                  Marmita com bife de gado acebolado
                </p>
                <div className="prices flex items-center justify-between pt-2">
                  <p className="old-price text-secondary line-through">
                    R$ 15,00
                  </p>
                  <p className="price text-lg font-medium">R$ 12,00</p>
                </div>
                <div className="drop-time drop-price flex items-center gap-2 pt-1">
                  <p className="text-secondary text-sm">30 - 40 min</p>
                  <p className="text-green-500">Grátis</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
