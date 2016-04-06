import * as common from '../../actions/common.jsx';

export function replay() {
    common.startApplicationAndLoadQuestion();
}

export function quit() {
    console.log('Quit');
}