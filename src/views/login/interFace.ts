import userStore, { IUserStore } from '../../store/userStore'
import { FormComponentProps } from 'antd/lib/form'

interface IProps extends FormComponentProps {
  userStore: IUserStore,
}

export default IProps