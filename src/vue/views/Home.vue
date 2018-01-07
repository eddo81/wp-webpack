<template>
  <div id="hello">

    <header class="ta-center container--lg">
      <a href="javascript:;" class="js-grid-toggle grid-toggle link__underline">Toggle Gridlines</a>
      <h1>
        Cutestrap
      </h1>
      <p>A sassy, opinionated CSS Framework. A tiny alternative to Bootstrap.</p>
      <p>
        <code class="fs-large">npm install cutestrap</code>
      </p>
      <p>
        <a class="link__underline--middle" href="https://github.com/cutestrap/cutestrap/raw/master/cutestrap.zip">Download</a> | <a href="https://github.com/cutestrap/cutestrap" target="_blank" rel="noopener" class="link__underline--right">GitHub</a>
      </p>
    </header>

    <section class="container">
      <article class="row">
        <div class="col-md-4">
          <h4>Forms</h4>
          <p>
            Beautiful, consistent form controls that don't compromise browser accessibility.
          </p>
        </div>
        <div class="col-md-4">
          <h4>Grid</h4>
          <p>
            An "Implicit Grid" created using flexbox. Just a single class to create a grid.
          </p>
        </div>
        <div class="col-md-4">
          <h4>Typography</h4>
          <p>
            All elements and components align perfectly to the baseline grid.
          </p>
        </div>
      </article>
      <article class="row">
        <div class="col-md-4">
          <h4>Sass</h4>
          <p>
            Easily customize the default variables and include only the files you need.
          </p>
        </div>
        <div class="col-md-4">
          <h4>BEM</h4>
          <p>
            The BEM Methodology is used for naming conventions, because it's simple and flexible.
          </p>
        </div>
        <div class="col-md-4">
          <h4>KSS</h4>
          Documentation is generated using KSS, making cutestrap a simple launching point for your styleguide.
        </div>
      </article>
    </section>


    <section class="container--md">
      <div class="row">
        <div class="col-md-8 offset-md-2">
            <h3 class="ta-center">Another framework?</h3>
            <p>
              There are plenty of amazing front end frameworks already, such as, <a class="link" href="http://getbootstrap.com/" target="_blank" rel="noopener">Bootstrap</a> and <a class="link__underline--middle" href="http://foundation.zurb.com/" target="_blank" rel="noopener">Foundation</a>. If you're looking for something feature rich with loads of components, those are both great choices.
            </p>
            <p>
              However, if you're looking for something in between <a class="link" href="https://necolas.github.io/normalize.css/" target="_blank" rel="noopener">normalize.css</a> and a full blown framework, meet Cutestrap. <strong>Cutestrap is only 8kb of CSS.</strong>
            </p>
        </div>
      </div>
    </section>


    <section class="container--lg">
      <div class="row">
        <div class="col-md-10 offset-md-1">
            <h2>Forms</h2>
            <p>
              Form controls are unified in both their display and in their semantic markup. Because they are modified using only CSS, accessibility doesn't suffer.
            </p>
            <form>
              <v-textfield id="textfield2" name="textfield2" label="has label"></v-textfield>
              <v-select id="select2" label="select2" name="select2">
                <option disabled selected>Flavors</option>
                <option>Chocolate</option>
                <option>Vanilla</option>
              </v-select>
              <v-radio name="example" value="Cone" label="Cone"></v-radio>
              <v-radio name="example" value="Bowl" label="Bowl"></v-radio>
              <v-textarea label="Special Requests" name="Special Requests" placeholder="hej"></v-textarea>
              <v-checkbox name="Sprinkles" value="Sprinkles" label="Sprinkles"></v-checkbox>
              <br>
              <input type="submit" value="Place Order">
            </form>
          </div>
        </div>


      <h3>Buttons</h3>
      <p>
        A default button is applied with the <code>.btn</code> class or automatically on <code>button</code> tags or button/submit inputs.
      </p>
      <p>
        <button>Default</button>
        <button class="button--theme">Secondary</button>
        <a class="button" href="#">Link</a>
      </p>

      <hr>

      <h2>Grid</h2>
      <p>
        The grid is completely implicit, so columns will size themselves to be equal width to their siblings.
      </p>
      <section class="grid">
        <div class="example-column"></div>
        <div class="example-column"></div>
      </section>
      <section class="grid">
        <div class="example-column"></div>
        <div class="example-column"></div>
        <div class="example-column"></div>
      </section>
      <section class="grid">
        <div class="example-column"></div>
        <div class="example-column"></div>
        <div class="example-column"></div>
        <div class="example-column"></div>
      </section>
    <pre><xmp><section class="grid">
      <div>25% Column</div>
      <div>25% Column</div>
      <div>25% Column</div>
      <div>25% Column</div>
    </section></xmp></pre>

      <h3>Grid Modifiers</h3>
      <p>
        The grid will display on all screens by default. If you'd like the grid to only start on larger screens, you can use these modifier classes. Columns will be stacked on smaller screens.
      </p>

      <table>
        <tbody><tr>
          <td><p><code>.grid--medium</code></p></td>
          <td><p>The grid will start 600px screen width.</p></td>
        </tr>
        <tr>
          <td colspan="2">
            <section class="grid grid--medium">
              <div class="example-column"></div>
              <div class="example-column"></div>
            </section>
          </td>
        </tr>
        <tr>
          <td><p><code>.grid--large</code></p></td>
          <td><p>The grid will start at 960px screen width.</p></td>
        </tr>
        <tr>
          <td colspan="2">
            <section class="grid grid--large">
              <div class="example-column"></div>
              <div class="example-column"></div>
            </section>
          </td>
        </tr>
      </tbody></table>

      <h3>Column Modifiers</h3>
      <p>
        By adding these modifier classes, you will change the <code>flex-grow</code> property that the columns use to size themselves, effectively changing the <strong>"weight"</strong> of the column. Heavier weighted columns will be wider than lighter columns. If all the weights are equal, the column widths will be equal.
      </p>

      <table>
        <tbody><tr>
          <td><code>.column--light</code></td>
          <td>Half the weight of the default column.</td>
        </tr>
        <tr>
          <td><code>.column--heavy</code></td>
          <td>Twice the weight of the default column.</td>
        </tr>
      </tbody></table>

      <h3>Wrappers</h3>

      <p>
        Wrappers are classes that have a max-width and padding. The size of the wrapper, determines max-width and the padding.
      </p>

      <table>
        <tbody><tr>
          <th>Class</th>
          <th>Effect</th>
        </tr>
        <tr>
          <td><code>.wrapper-small</code></td>
          <td>Max width of 640 with top/bottom padding equal to the baseline.</td>
        </tr>
        <tr>
          <td><code>.wrapper</code></td>
          <td>Max width of 960 with top/bottom padding of twice the baseline.</td>
        </tr>
        <tr>
          <td><code>.wrapper-large</code></td>
          <td>Max width of 1200 with top/bottom padding of three times the baseline.</td>
        </tr>
      </tbody></table>

      <hr>

      <h2>Typography</h2>

      <p>
        All the typography is sized using rems (based on 62.5% by default, going up to 78.125% on screens larger than 960px), to a baseline of 2.4rem by default. Every element adheres to this baseline grid with perfect vertical rhythm.
      </p>

      <h1>Headline 1</h1>
      <p>
        Paragraph
      </p>
      <h2>Headline 2</h2>
      <ul class="list--disc">
        <li>Unordered item</li>
        <li>Unordered item</li>
        <li>Unordered item</li>
        <li>Unordered item</li>
      </ul>
      <h3>Headline 3</h3>
      <ol>
        <li>Ordered item</li>
        <li>Ordered item</li>
      </ol>
      <h4>Headline 4</h4>
    <pre>  Preformatted
    </pre>
      <h5>Headline 5</h5>
      <blockquote>
        Blockquote
      </blockquote>


      <blockquote class="fs-h5">
        <q>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor fermentum dui et condimentum. Duis erat arcu, condimentum in quam eget, aliquet vestibulum libero. Nullam porttitor malesuada placerat.</q>
      </blockquote>

      <h6>Headline 6</h6>
      <table>
        <tbody><tr>
          <th>Table Header</th>
          <th>Table Header</th>
        </tr>
        <tr>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
      </tbody></table>

      <hr>

      <h2>Utilities</h2>

      <table>
        <tbody><tr>
          <th>Class</th>
          <th>Effect</th>
        </tr>
        <tr>
          <td><code>.disabled</code></td>
          <td>Disables pointer events and lowers the opacity</td>
        </tr>
        <tr>
          <td><code>.clearfix</code></td>
          <td>Force an element to self clear its children</td>
        </tr>
        <tr>
          <td><code>.f-none</code></td>
          <td>Set the float property to none</td>
        </tr>
        <tr>
          <td><code>.f-left</code></td>
          <td>Set the float property to left</td>
        </tr>
        <tr>
          <td><code>.f-right</code></td>
          <td>Set the float property to right</td>
        </tr>
        <tr>
          <td><code>.ta-left</code></td>
          <td>Left align the text</td>
        </tr>
        <tr>
          <td><code>.ta-center</code></td>
          <td>Center align the text</td>
        </tr>
        <tr>
          <td><code>.ta-right</code></td>
          <td>Right align the text</td>
        </tr>
        <tr>
          <td><code>.fw-light</code></td>
          <td>Light (300) font weight</td>
        </tr>
        <tr>
          <td><code>.fw-normal</code></td>
          <td>Normal (400) font weight</td>
        </tr>
        <tr>
          <td><code>.fw-semibold</code></td>
          <td>Semibold (500) font weight</td>
        </tr>
        <tr>
          <td><code>.fw-bold</code></td>
          <td>Bold (600) font weight</td>
        </tr>
        <tr>
          <td><code>.fs-small</code></td>
          <td>Small font size</td>
        </tr>
        <tr>
          <td><code>.fs-base</code></td>
          <td>Default font size</td>
        </tr>
        <tr>
          <td><code>.fs-large</code></td>
          <td>Large font size</td>
        </tr>
      </tbody></table>

    </section>

    <section class="container--md ta-center">
      <h3>Feedback</h3>
      <p>
        If you notice something is broken or would like to request a feature, please <a href="https://github.com/cutestrap/cutestrap/issues" target="_blank" rel="noopener">open an issue on Github</a>. You can also <a href="https://github.com/cutestrap/cutestrap#fork-destination-box">fork the repo</a> and open pull requests, just check the README for guidelines.
      </p>
      <p>
        If you want to chat, <a href="mailto:cutestrap@bamzap.pw">Shoot me an email</a>.
      </p>
    </section>


    <footer class="container--sm">
      <div class="row">
        <div class="col-md-12">
          <p class="copyright f-left">
            Cutestrap ©2016
          </p>
          <p class="ta-right f-right clearfix">
            Made with ♥ by <a href="https://www.tylerchilds.com" target="_blank" rel="noopener">Tyler Childs</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
