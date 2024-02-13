import Button from '../Button/Button'
import './Banner.scss'

export default function Banner() {
  return (
    <div className="banner">
      <h1 className="banner__title">Онлайн портфолио кафедры ”Технология художественной обработки материалов”</h1>
      <div className="banner__links">
        <Button theme='transparent' tag='a' href='/works'>Работы</Button>
        <Button theme='transparent' tag='a' href='/about'>О нас</Button>
      </div>
    </div>
  )
}
