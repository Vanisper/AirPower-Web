import { Language } from '@airpower/i18n'
import { createApp } from 'vue'
import { WebI18n } from '../src'
import App from './App.vue'

// noinspection TypeScriptValidateTypes
WebI18n.addLanguage({
  language: Language.English,
  Column: 'Column',
  Add: 'Add',
  Export: 'Export',
  Import: 'Import',
  UploadError: 'UploadError',
  FileUploadErrorAndRetryPlease: 'FileUploadErrorAndRetryPlease',
  FileTypeNotSupported: 'FileTypeNotSupported',
})
// WebI18n.setCurrentLanguage(Language.English)
createApp(App).mount('#app')
