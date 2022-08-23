const IMAGE_BASE_URL = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public"

export default function ImageViewer ({
    $target,
    initialState = {
        node: {}
    }
  }) {
    this.$element = document.createElement('div')
    this.$element.className = "Modal ImageViewer"
    
    this.state = initialState
    this.setState = (nextState) => {
        console.log("setstate")
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $target.appendChild(this.$element)
        const { node } = this.state
        if (!node) {
            return;
        }

        this.$element.innerHTML = `
            <div class="content">
                <img src="${IMAGE_BASE_URL}${node.filePath}">
            </div>
            `
    }

    this.close = () => {
        try {
            $target.removeChild(this.$element)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    this.$element.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            return;
        }

        this.close()
    })

    document.addEventListener('keydown', (e) => {
        if (e.key != "Escape") {
            return;
        }

        this.close()
    });

}