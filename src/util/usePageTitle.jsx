import {useDocumentTitle} from 'usehooks-ts'

function usePageTitle(value) {
    const title = value ? `lockpickingtv - ${value}` : 'lockpickingtv'
    return useDocumentTitle(title)
}

export default usePageTitle
