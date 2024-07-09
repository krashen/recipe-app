import { WithContext as ReactTags } from 'react-tag-input'

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
    comma: 188,
    enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const InputList = ({ extraCSSClass, placeholder, list, handleRemove, handleAdd }) => {

    return (
        <div id='tags' className={extraCSSClass}>
            <ReactTags
                tags={list}
                delimiters={delimiters}
                handleDelete={handleRemove}
                handleAddition={handleAdd}
                inputFieldPosition='bottom'
                allowDragDrop={false}
                placeholder={placeholder}
                editable
            />
        </div>
    )
}

export default InputList