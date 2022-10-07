import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return (
        <div className="backdrop-modal" onClick={props.onConfirm} />
    );
}

const ModalOverlay = ({ modalInfo, onMainMenuAfterSuccess, onMainMenuAfterFail, toPlayAgain, toTryAgain, ...props }) => {
    return (
        <div className="modal text-center">
            <ul className="modal-ul">
                <li className={modalInfo.status ? 'text-green-400' : 'text-red-400'}>{modalInfo.outcome}</li>
                <li>{modalInfo.inTries}</li>
                <li><button onClick={modalInfo.method1}>{modalInfo.button1}</button></li>
                <li><button onClick={modalInfo.method2}>{modalInfo.button2}</button></li>
            </ul>
        </div>
    )
}

const ModalComponent = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.toHideModal} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(
                <ModalOverlay
                    modalInfo={props.modalInfo}
                    onMainMenuAfterSuccess={props.onMainMenuAfterSuccess}
                    onMainMenuAfterFail={props.onMainMenuAfterFail}
                    toPlayAgain={props.toPlayAgain}
                    toTryAgain={props.toTryAgain}
                    toHideModal={props.toHideModal}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}
export default ModalComponent