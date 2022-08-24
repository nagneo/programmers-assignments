export default function Loading ({
  $target,
  initialState = { isShow : false }
}) {
  this.init = false;
  this.$element = document.createElement('div')
  this.$element.className = "Modal Loading"
  
  this.state = initialState
  this.setState = (nextState) => {

      //DEBUG
      //console.log("[Loading] setstate") 
      this.state = nextState;        
      
      const { isShow } = this.state;
      if (isShow)
      {
          this.$element.style.display = "block";
          if(!this.init)
          {
              this.render()
              this.init = true
          }
      }
      else {
          //DEBUG
          //console.log(false)
          this.$element.style.display = "none";
      }
  }

  this.render = () => {
      $target.appendChild(this.$element)
      this.$element.innerHTML = `
          <div class="content">
              <img src="./assets/nyan-cat.gif">
          </div>
      `
  }
}