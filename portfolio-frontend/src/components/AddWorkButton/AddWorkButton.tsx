import Link from 'next/link'
import './AddWorkButton.scss'


export default function AddWorkButton() {
  return (
    <Link href='/profile/add' className='add-work-button'>Добавить работу</Link>
  )
}
