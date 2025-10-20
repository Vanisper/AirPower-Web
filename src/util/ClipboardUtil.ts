import useClipboard from 'vue-clipboard3'

/**
 * ### 剪贴板工具类
 *
 * @author Hamm.cn
 */
export class ClipboardUtil {
  /**
   * ### 剪切板复制指定的内容
   * @param content 复制的内容
   */
  static async copy(content: string): Promise<void> {
    const { toClipboard } = useClipboard()
    await toClipboard(content)
  }
}
