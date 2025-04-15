import { ElMessage } from 'element-plus'

/**
 * # 消息工具
 * @author Hamm.cn
 */
export class MessageUtil {
  /**
   * ### 警告消息
   * @param message 消息
   */
  static warning(message: string) {
    this.show(message, 'warning')
  }

  /**
   * ### 成功消息
   * @param message 消息
   */
  static success(message: string) {
    this.show(message, 'success')
  }

  /**
   * ### 错误消息
   * @param message 错误
   */
  static error(message: string) {
    this.show(message, 'error')
  }

  /**
   * ### 显示消息
   * @param message 消息
   * @param type 类型
   * @param duration 显示时长
   */
  static show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 3000) {
    ElMessage({
      message,
      type,
      plain: true,
      duration,
    })
  }
}
