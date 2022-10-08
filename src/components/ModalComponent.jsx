import ReactDOM from 'react-dom'

/*
const Backdrop = (props) => {
    return (
        <div className="backdrop-modal" onClick={props.onConfirm} />
    );
}
*/

const Backdrop = () => {
    return (
        <div className="backdrop-modal" />
    );
}

const ModalOverlay = ({ modalInfo, onMainMenuAfterSuccess, onMainMenuAfterFail, toPlayAgain, toTryAgain }) => {
    return (
        <div className="modal text-center border-8 border-[#cce3de]">
            <ul className="modal-ul">
                <li className={modalInfo.status ? 'text-green-400' : 'text-red-400'}>{modalInfo.outcome}</li>
                <li>Tries Left: {modalInfo.inTries}</li>
                <li>Correct Number: {modalInfo.correctNumber}</li>
                {modalInfo.status && (
                    <>
                        <li><button onClick={toPlayAgain}>Play Again</button></li>
                        <li><button onClick={onMainMenuAfterSuccess}>Main Menu</button></li>
                    </>
                )}
                {!modalInfo.status && (
                    <>
                        <li><button onClick={toTryAgain}>Try Again</button></li>
                        <li><button onClick={onMainMenuAfterFail}>Main Menu</button></li>
                    </>
                )}
            </ul>
        </div>
    )
}

const ModalComponent = (props) => {
    return (
        <>
            {/* {ReactDOM.createPortal(<Backdrop onConfirm={props.toHideModal} />, document.getElementById('backdrop-root'))} */}
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(
                <ModalOverlay
                    modalInfo={props.modalInfo}
                    onMainMenuAfterSuccess={props.onMainMenuAfterSuccess}
                    onMainMenuAfterFail={props.onMainMenuAfterFail}
                    toPlayAgain={props.toPlayAgain}
                    toTryAgain={props.toTryAgain}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}
export default ModalComponent