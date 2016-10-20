import React from 'react';

export default class ImagePreview extends React.Component {

    render() {
        const shouldRender = this.props.images && this.props.images.length > 0;
        return (
            <div>
                {shouldRender && this.props.images.map(image =>
                    <div key={image.name} className="preview">
                        <p>{image.name}</p>

                        <img className="preview__thumb" src={image.src} />
                    </div>
                )}
            </div>
        );
    }
}

ImagePreview.propTypes = {
    images: React.PropTypes.array,
};
