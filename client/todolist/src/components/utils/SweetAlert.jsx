import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const OpenSwal = (title,
    message,
    icon,
    html,
    confirmButtonText,
    denyButtonText,
    cancelButtonText,
    footer,
    closeButtonHtml,
    iconHtml,
    loaderHtml) => {
    MySwal.fire({
        title: title,
        text: message,
        icon: icon,
        html: html ? null : html,
        confirmButtonText: "Aceptar",
        denyButtonText: "Denegar",
        cancelButtonText: "Cancelar",
        footer: footer ? null : footer,
        closeButtonHtml: closeButtonHtml ? null : closeButtonHtml,
        iconHtml: iconHtml ? null : iconHtml,
        loaderHtml: loaderHtml ? null : loaderHtml
    })
}

export default OpenSwal;