import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import "./report.css";
import lineImg from '../../assets/images/line.png';
import headerpdf from '../../assets/images/header-pdf.png';
// Font.register({
//   family: "NotoSansArabic",
//   src: NotoSansArabicFont,
// });
let language = "";
const ReportArbic = ({ value, isOn, pdfValue, type }) => {
  language = isOn;

  let renderedHeaders = [];
  let renderedHeaders2 = [];

  function isHTML(input) {
    const trimmedInput = input.trim().toLowerCase();
    return trimmedInput.startsWith("<table>");
  }

  const contentRef = useRef(null);

  const handleGeneratePDF = () => {
    try {
      const content = contentRef.current;
      // Set the options for html2pdf.js
      const options = {
        margin: [25, 7, 18, 7],
        filename: `RFP Report - ${new Date().getFullYear()}`,
        fontSize: "20px",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // Enable page breaks
        pagebreak: { mode: ['css', 'legacy'] },
      };

      // Create an instance of html2pdf
      html2pdf().from(content).set(options).toPdf().get('pdf').then((pdf) => {
        var totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          if (i !== 1) {
            // set footer to every page
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.setTextColor(150);
            // pdf.text(pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 10, ` ${totalPages}|${i}`);
            
            pdf.addImage(headerpdf, 'png', 0, 2, 200, 0)
            pdf.addImage(lineImg, 'png', 0, 285, 210, 0)
            const text = `${totalPages}|${i}`;
            const textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

            // Calculate the position for the text
            const textX = pdf.internal.pageSize.getWidth() - 179 - textWidth;
            const textY = pdf.internal.pageSize.getHeight() - 4;

            // Add the text to the PDF
            pdf.text(textX, textY, text);
          }
        }

      }).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <button className="btn btn-danger px-4 buttondown" onClick={handleGeneratePDF}>
        {isOn === "English" ? "Export as PDF" : "تصدير كملف PDF"}
      </button>
      <div className="d-none">
        <div id="pdf-content" ref={contentRef} >
          <div dir={language === "English" ? "ltr" : "rtr"}>

            <div style={language === "English" ? styles.page : styles1.page1}>
              <div className="mt-5 pt-4" style={styles.section}>
                <div
                  style={
                    {
                      // display:"flex",
                      // justifyContent:"center",
                      // alignItems:"center",
                      // flexDirection:"col",
                      // textAlign:"center"
                    }
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUVGBcYGRUYGBcXGBsYGB0XGR0XFRgYHyggGh0lHh0aITEhJiorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0mICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABHEAACAQMBBQUEBwQHBwUBAAABAgMABBEhBQYSMUEHE1FhcSIygZEUQlJiobHBI3KCkiQzU2NzstEVQ5Oi4fDxJTVEs8II/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAEFAgMEBgf/xAA0EQACAgIABQMCBAUDBQAAAAAAAQIDBBEFEiExQRNRYSIyQnGBoQYUYpGxM1LBIyQ00fD/2gAMAwEAAhEDEQA/AO4UAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQg+ZqSRxVAXU1Lna1vH/WTxJpn2nUaeOpoZxrm+yZHyb4bPXneQf8RT+VDasW5/hYi3x2e3K8g/nA/OgeJcvws3bXbVtJju7iJ88uF1J+QNDXKqce6ZvBgeRoa2mhmgPtAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAeHkAGSQAOZOlCUmyo7V7RLSNu6g47qX7EC8fzbl8s02dleDY1uX0r5NIXG3bv3EhsUPV8SS49MEfMChny4lXduT/AGPa9nry63e0LqY9VVu7T+UZxQh5yj0hBI2oOzrZUXtG3B8Wkkcj4gtw/hQwefe/xG9BuxsviaNba2LKAWXhRmAPIsNSAfOhreVc/wATM7bnbPIx9Dt/+Gv+lAsq5fiZoXfZzsyTnaqPNGkT/K2D8aGxZ96/EaDdnCx62t7d25HJRJxJ8VOM/OmjP+fb++Kf6GPutu2vJ4L5B0IEUmPIjA/E0J3iW904v9jYse0aAOIryKWzk5YlU8BPk+OXmQBQxngz1utqS+C4W1ykih0ZWU6hlIII8QRQ4pRcXpozUIFAKAUAoBQCgFAKAUAoBQCgFAKA+E0BVN5d94rd/o8KG5ujoIY9cH+8Izw+nPFDrpxJTXPLpH3ZExbqXu0Pb2nOUj5i0hPCo8nbXP4+oobv5iqjpStv3Zctk7Ft7VeCCJIx90an1PM/GhxWWzse5M3wKGs+0BVu0m1spbGRL6ZoYMqS6kBuJTkBQVbiJxywaAoO529Wx02mos0uXlugkBkkIEYCgagH2iTwrnPhpjqB2egIHfKe+S34tnxxyT8ajhk0Xg+sR7S68uvLNAYN2dsXk09zFcWZgSIqI5ckrJnnw558s5HQ0BZcUBq3+zop0McsayKejAEfjQzhOUHuLKVc7jzWrGXZdw0Rzk28hLwt5DOo+OfUUO2OXGxct638+Ta2Hv2O8FrfxfRLjl7WkT+aOdNfU+poY24fTnqfNH9y6A0OE+0AoBQCgFAKAUAoBQCgFAKA8TShQWYgADJJ0AA6k0JSbekc8vdu3W1JGt9nnurdTiS8IOvisI0+YOfTmRYRprx1zW9Zexat2d1rexThiX2j78rau5+836DShy35M7n9T6e3g0+0Te1dl2v0gpxsXRFTOMknJ18lDH5UNBYbK7SWNJUPEkiqyt4qwyD8qAzZoD7QHJv/AOjUP0G3I5C4GfjHJigOc2m3Fk2nsx1sBaJG8KBVB9v2wC5JVcnJ8/WgP0+aA57tztf2bbyyQFpXeMspZEynGNMZJGddNBigNPsQ2rdXsd1d3MzSM0ojUHRVCKGIRRoo9sdOg50B06gFAfMUBG7c2FBdxmOeMOvQ/WU+KtzBobKrp1S3FlJS5u9isFmLXVgTgS85IQeQYdQNPLwxyod7hVlL6ek/8nQbC9jmRZI2Do4yrA5BFCulFxlytGxQxFAKAUAoBQCgFAKAUB4mlCgsxAAGSToAB1NCUm3pHOJZZtuSmONmi2dG2GcaNOw+qv3f++fKCyUY4kdvrN/sdB2fYxwxrFEgREGAo5CpK6c3N7l3NmhiQO/GwBf2U1tpxOuUJ6SLqh+YHwJoDiW6PaJtKO1TZtpamS4jLKHKs7ImdFMeAAVORljjlQGXeDZu2beBry82x3M4AZLUTsHbByVCxkIDz0AYHyoCW2f268NtEjWsk13jDkMqRsQThlwGYkjBI4RrmgMg363judbbZojU8i0T9evFKyj44oDQut2N4765tp7uJAbaRWXLQLpxKxwIyc+6OdAdt23PKkErQxmSUI3AgKgl8YGrEAa68+lAfmdbK+sra5huNkl2uAf6TJEXePIwSjgEDqeY1oC49kvaVYWVolncd5E4d2aXh4oyWY4zwniGBgcunOgO07M2rBcIJIJUlQ/WRgw+OOXxoDcoBQCgPE0SsCrAMpBBBGQQeYI6igTae0c4v7GXYspuLcNJYucywZyYj9uPPT/wdMECzjOOXHkn0muz9zoGzr+OeNZYmDI4BVh1B/L0oV04OEuVm1QxFAKAUAoBQCgFAfDQHOt4LuTat0dn27FbaIg3Uq9Tn+qU+oI9Qeg1FlTBY1fqy+59v/Zfdn2UcMaxRoERBhVHID/vrQr5zc5czNmhiKA0NtbYgtImnuJFjjXmzfkANWJ8Bk0B+c02jd3W1bmbYiTJ3+Q2iDAbBZmLezGCw4gScjJoC9bvdiis3fbSuHnlbVkV2xn78re259MUB0vYu7dnaDFvbRReaqOI+rn2j8TQEtQCgPlAKAgdvbmWF4D39rExP1wOCT+dMN+NAc02v2RXVm5uNkXciuNe6ZuBj14Q4wrDycAeJoDa3X7XJIpfom14WglGnfcBUeGZE6D7y5B8AKA65bzrIodGDKwyGUggg9QRoaAyUAoDxLGGBVgCCCCDqCD0IoE9PaOcDi2JdYyf9nXLeZ7iQ/8A5P5DxGos/wDy6/61+6OkI2QCNQeRoVmtPTPVAKAUAoBQCgFAVHtC2+8EaW9vrc3J7uIDmudC/ljPPx16Gh2YdKnLnl9q7knuju/HY26wrq3vO/V3PNv0HkKGnJvd03Im6GkUBX9897bfZsBmmOSchIwRxO32V8vE8hQHJNj7vX+8cwvL12hswSERcjI8IQfxkOc6gcsADtWw9iW9nEIbeJY0XoOZ82J1Y+Z1oCQoCO2xty2tRxTzJHnkCfaP7qjU/AU2jZXRO16gmyoz9qETEi1tLi581QhfyJ/CtFmTVX90kv1O+PDJr75JGA74bXbHBsxVH35P+q4rklxjEj+NGz+QoXez9jyd8dsL7+zFYD7D/wChbPyqI8XxH+ND+Qx/Fn7GSDtTRCBd2dxb+ZXI/wCYKfkDXZXkVWdYSTMJcLk/skmW7Ym8lrdj9hOjnnw5w49UbDD5VvOG3Hsqf1xJehpIDe7dG12jF3dxHkjPBIukiHxVv0OQfCgOP217tDdi4WKXM9hI3skZxrkkx5/q5OpQ6HX1AHcNibXhu4UuIHDxuMhh+II6EHQg8qA2bu6SJGkkdURBlnYhVAHUk8qAp27HaXbX9y1tbw3DcP8AveAd3w6+0xzlAemRrmgLTtnZcdzC8Eq5Rxg+I8CPAg6/ChnXZKuSkvBU9wNpSQySbLuTmW31ic/7yD6pHoCPhp0NDszIRklfDs+/wy9ZocAoBQCgFAKA8TSBVLE4ABJJ5ADUk0CW3ooG48Rvrufasg9nJhtgeka82Hrk/EvQscmXpVqhfmzoQoVwoCK3n29DY20lzMfYQchzZjoqL5k6fj0oDju5+wJ9v3Z2lf5+jIxEcWvC3Cf6tfuD6x+scigO6RRBQFUAAAAAaAAcgB0FAY7y6SJGkdgqKCWZjgADqSaExi5PUTnt7vdd37NFs5e7iBw124/+pT/59Krs/iVOLH6n19i1qw66lzXPb9j1szcm3Ru9m4rmY6tJL7Wvkp/XNeOy+PZN3SHRG6WRLWodEWVECjAAAHQDA+VUs7Zz+5s0dWeq1AVIPEsYYYYAg9CMj5Gtlds4fa9BPXkq22Nw7aU8cObeUah49AD48P8AoQau8Pj19PSzqjohlSj0kto17He292a4i2gpmhJwtwurD1+16HDebV7HB4jTlx3F9fY124ddy5qej9jpez76OdFlicOjDIZTkGrAqJwlB8sjFtjZUN1C8E6B43GCp/MeBHMHpQxOHRy3O69+UPHLs+difM+Y6CVdM9GA+QGcLtHeeXJzbbORtOvFj/7JP+VfXmB2Hdrd23sYRBbxhFHM82ZvtO31jQEvQFG7S9nuix7RgH7azYMcfWiOjKfIAn4FqHfhWJ7ql2l/ktuyL9LiGOeM5SRQw+PQ+YOlDjsg4ScX3RuUMBQCgFAKApfajtBltltYv628dYV/dJ9o+mNP4qHdgQTs55do9Sz7F2cltBHAnuxqFHnjmficn40OSyx2Tcn5N2hgfCaA4RvPcSbwbXWxhYiztmbjccvZ0eT1J9hfXPImgO4bPso4IkhiUJHGoVVHIAchQH28ukiRpJGCooLMx0AA5k0JjFyfKjmEkku2peN+KPZ8bewmoaYg+83l+XIa8qDi/F440fTr6yf7F1XXHFj7zf7Fxt7dY1CIoVVGAoGAAOgFeDuunbLnmzS231Z4+imWQgNwtHHxKenE7YHEOowjAjwY4wcGvS8BwIZFFnOu/Q5b5tNHuCXiByOFlPCy8+FhzGevMEHqCD1qiz8OeLa4SN8JqSMtcJmzVv76OFeORgo5eZPgAOZrpx8ay96gjnvya6Y7mypzb4P3rcAXu+SlgcYHN2A1JONBpXpq+Aw9Jc3c85ZxyStfKuhK7P3mRgO9MceeWWJb1ZQpCA+bVW5XB5w/0+pZY3FYSX/U0iauIElQo6q6MNQcEEVVV22UT3Ho0XELO0osouZ9hziSPiksZW9uPmUJ/XHI9cYOuK95wji8cqPLPpL/ACdc4Qy4afSa8+51fZ17HNGksbBkdQykeB/L0q+KKcHCXLJdTQ3o2baXMawXaoySSLwKx4cyLlgFI1zgHlzGR1qDE4df3+07++k2cLiLZy2yvwwK7xRARjIAZBlsjBycDGoHSgLn2N7/ADXHFYXUgeePPdyEg96gzkcQ94rzz1Bz0oDq9AY54g6lWGQwIIPUHQj5UCbXVFF7OZDbTXWzHJ/YP3kWesUmunjgkH1Y0LDNSnGNy8rT/Mv1CvFAKAUB8NAUIf0vbp6pYRD072Qf6H5pQsP9LE+ZP9kX0UK9Gltra8FpE09xII4lxlyCeZwBhQSTnwoDmm+3a9YtZTLZTs1w44E/ZyJgNoZAWUDQZ+OKAmOxTdkWez0lYDvboCVj4IR+zTPkuvqxoDoNAc231u2v7tdmxMRDHh7lx+Eefl8T92q3iefHEpcvPgtsOr0q/Wl3fYsltAsaqiKFVQAFHIAdBXza26Vs3OQb29sy1pIM+wly87feRPgEVvzc19D/AIehy4i+WcF7+o+bcg4D369ABIPFB9f1TU+hbyrZxjh6yaeZd0RVPlZhFfOpRcXpnfvZT9+pCODBC6ED7RzzC/ZAHM9cqK9VwBLTPM8ek+iKbXqjy3kkNjMofLnhTq/dLJg9B7QIH51wZ2+T6e/t2O/Ba5vr7fls6ZaoAihcYAGCoAB8wBoM89PGvn97k7G5dz3dKSgtdhd2ySI0bqGVwQQeRBpRdKqanHujcm4tSRUNyLx9m3rbOlYmGYloGPieQ+OoP3h519K4dmxyqVNfqbc2tX1q6Pddy+707BS+tmgdmQkqySKcNHIhysiHoQf1qwKU4bvl2fXyl73ad2jxRhVMsal5nUHhVQnCo4jnHEzadScCgLbsnb+zNj2NreQWbtDdAq8wKNOJF+pIWwDyfQEAcPLWgOq7PuhLFHKAQJEVwDw5AYAgHhJGdehI86A2DQFB3wH0XadjejRZSbaX0b3SfTJP8A8KFhjf9SidXt1RfRUlefagCgFAeXOBmg+Cjdla94t3dnU3Fy5B+4vuj4ZNQiwz/pcYLwi91JXmrtKwjuI3hlQPG4Ksp5EH/vnQFAm7FNlmIoomDnlMZCWB/d9wj4UBl7EIZo7OeCViwt7qaFD04U4QeH7vHxH4mgLlvDtUWttLO3+7RmA8W+qvxOB8aM2UVuyxQXkpW4Gz2jt++k1muSZXY8/a1UfLX+I18849metkcq7RLjIknLlXZdCz1QmkVJBubA1WRvGVv+UKn/5r6ZwZaw4Fdb9zJNhmrM1laii7tmh6Jjh/w2zwfLDL/BnrXz3j2F6F/Mu0up3Uz3EhN6rEuE4fekdIuL7KHiYkepxn0qeEZKr2n4Wyr4rjuzl15eikX9iyMoB0LXAweeIOHX8SfhXqqc1TTb+CqjwhPFstfeL1+hK7u7OkdZSMh04laMnTiXB7uReTLIhBB6a+FcOflxi4+z8nRDg9lMU09prZeNlwBIUQZwFGM8wDqAfQHHwryGbPnubL/FhyVpG3XIdJUe0jZhkthOmktuRIrDnw5Gflo38Neh/h/M9O/wBN9mdOLNKTi+z6F43V2sLu0huBzdfa8nHssP5ga9+U+RU6rJQfg2Nt7MS6t5bdx7MqMh8uIEZ9QdfhQ0n562DIrbH2ps66dUktH72PiYD9oCQyJnmSyYx/eUB1bsR2k0+yYQ5yYmeLP3UOV+SkD4UBfaAp/arZmTZ0rL70RSVT4cBGSPgTQ7MCerkn56f3LFsW8E1vFKOUkaN/MAaHNbHlm4m9QwFAKAjd5bju7S4cc1ikI9QpobKY7sS+SI7MrXu9mWw8UL/zsz/rQ350t3yLTQ5BQCgNeys44V4I1CLljgaasSzE+ZJJJ8TQFJ7W5eKK2tB/8m4RT+6CM/iVrRk2enTKfsmWXDY6m5+yZORoAAByAAA8hXym2fNNy+TM9VrAoDc3e/q2HhLJ+LE/rX0/hD3iQK637mSlWJrIXbicMkT/AGuOM/EcYz6cDY/eNef/AIioU8bm9mbqHqRrsoPMdQfiORrwSm49jtlBPuVjb9qovrE4HC7XAYdCWjyfnwir7BvnLEt69Vo2V1Q9KcddzLdn6PtGN/qXaGNv8WPLIfUrlfgK11byMGSfeD3+hnFc1WvYsgqjbNOhUGRjniDqyHUMCD6HQ1uom4WRkvBCemmV3scmKxXNqx1t52A9Dp/mVj8a+q49nPXGXwRxWP1xn7o6LW4qzl22OxyG7vp7qa4ZY5WDCKMANnADZds8yCdB1oDoWwtjQ2cKwQJwRpnAznU6kknUknrQEhQEfvBa97bTxa+3FIun3lI086GymXLYn8ohOy6449mW5+yGX+VmFDfnR1fItdDkFAKAr3aEf/TbrH9k36UOnD/14/mVvd3fOOLZlmxxnvY7Vxn3caFv5AG+NDqyMSbyJr9SYut80SS+j0/ocSyD7xKklfgeAfxUOdYkmov/AHH223yjee3iyoEtq1wx8PdKj5CQn0FA8WSi37PRp7M37WX6DnT6W0yn7vd5C59TwihnLClHm/p1+4vN/o0spboAFkuHgCZ58MhAP/C9uhEMKbsUPjZG723iT7V2dGjZ4EeU9RhlJX44XPyqr4zPlxJ/kdeHW4UWN/kWh84OMZ6Z5Z88dK+bVpOSUuxqZo7E2otxHxY4XQlJYycmORfeQ/mD1BBHOurOw3jzS7p9U/dGMJbNyeZUUu7BVUElicAAdSa5q65WSUY9WzMbmbXiuVneFuJFm4eLBGT3UWSM9M518q+lcKqnVjRhNaaOG+LjPTJG+25DE3ASWf2fYQcTDjOF4saLk6AsRmuq7Irq+96Nai32Ii42/BcqgQkMswUZxqy8SuoZSVJALZGc1W8Ttjbiziu+t6NkIuMupmjmViQGUkcwCCR645f9K+ezpnD7lo7k9le3zPAbSb+zuY8/uvlD+Yq24S+ZWw94s309eaPwfN9SP6Hn3vpkHD8Sc4+Gay4Umlcv6WKF935Ms1Uku7NJq7S2hHAhkkOmQoA1ZmbRUQdWJ0ArfjYs8iXLD9fgxlLRsg1pkuV6J7opm5m0Eg2zeQMcGcjgPTiA4+H1IY49POvpvCpc2LB/Bvza3PGhNeO5Orv6hg2hKoHFaM4QZ98Y4UJ9XDD0FWJwvDmnBf7jPeb6RrPJECMLZm5DefML/Lg0MViScU/nR9st80eSxQ4/pcLyE/ZdQpCn5SD1AoTLEklJ+z0a8W/0Zt7eY4/b3JgI8FDMOL5cJ/ioT/JT5nH2Wzam3wiDX6HlZxhv3sqSQP4sL60Ijiz+h/7jT7Gz/wCnL5Sy/nmhnxKOr9fCLzQ4BQCgK72hf+23X+Ef0odOH/rw/M/Opmbg7vJ4eLi4enFjGfXGlYnsnBN83kyPeuS7F2JkGHOdWGQ2vjqB8qEejDoku3Y+C7fIbibIUoDnUIQV4R5YJFB6MO2vkJdOODDEd2cr905DZHxGaD0o9fnueDO3DwcR4eLi4c6cWMcXrjShPpxT3ontyrtv9oW7MxJJ4Mnw4CgHywKreMR5sSa+Dlyq1Gl6O3V8zKMrm2bRreb6bF9YBJ00Cuo912PIEaji6ZGcKGr0PD7K8ur+UtfX8L9vg55pxe0Zt4p1m2fcMnIxSDXIIIBDBxzBUggjGQQRjNaMPGnj50YWLszdVYk1JFX2HvJa2Nr3cNwrMyAuyq/F3mWLcCso1PFwgnAAjyddK9hVZktz3Hu+n5GV2NbdZzcpWttb2ySgxwgxRlUVmJJlcozsGZ85BJbXUk41POsqsFc/qWPbLDG4ZpbsM3Zja99cNGyh4RGWdT7uRwqv5kY5EDXkK5eOW+jRzx6Psjnyq4tJ+TrsMUcKcKqkaL0AVFA6YAwBXhrLLsif1NtnKl7FZ7Rb2M2MgEiF+KMoAwJ4g6HQDyz8qteC41qyFuL11OrEhJ2LoQF7vZBcXtnxNwwwnjZmGB3pXTPgFOBnxJ6a1cQ4XbRj2uK+qX+DpWNKNcn5ZdTvLafVnSRjyjQhnY9FRQdSf+9K87XwjKsmly6K+2Mq1uSNHZVm1zMt7NqEBFugOUXi5yr0YkaB+oyRpw1359sMOr+Vp7v7n/wc0IuT5mWSvOI3nDd7bojaM8iEqyyjhYcwUCgEfEV9O4XDkxYL4L/GrUqEpEMs7AMAxw+OIfaweIZ+OtWB0elHp8Hv6W+SeI5K8GfuYC8PpgY+FCPSjrWvOxHeSKUIcgx+4c+7qW0+JPzoHVHr07ngzNwhMnhUlgOgJCgkefsj5UJ9KO29dzIb2T9p7ZPe/wBYfte0H1/iANDH0Y9Onbsdv7G1xs4HxlkP4gfpWSPMcVf/AHLLzQrRQCgIne2DvLK5TT2oZBr+6aG7Hly2xfyfmUVie4XYUAoD3FGzEKoJYkAAakk6AAUIlJRW2fZ4HRijqyMOasCpHqDrUkQnGa3F7Mmz7nupY5f7N0f+Ug/pWjJr9SqUfdMxthzQaP0NG4YBhqCMj0NfKrYck3E81rTZ9ZQQQRkHQg8iPA1EJOMuZENbWir3WzGiZo1BdJQVVeMoHGMCIsNBMq6Ru2jqoRjkK1fQOD51OZFeolzr/wC2cF1covcSCh3Bs3RWWW51JGS8JGRoy8Cx96WHIqVBGucV6FVJ9UzY+N5MVy6SPr9nVvg4mmyNT7UOn74kCMg/hNZekI/xBelppMmt1d3IrFSEeRpJMZfBRiFzgLHIqh1GTyJPhXPk4FORDlsRXW51tj23/Yk9o2MM+EuF71RqFfjgXI6hDl2PmRwjPrWjC4TRidYLr89TF5lvfmK83Z9YvJ3i98qc+6QBk/hn93h9SKsXCO966nZDjOSoaUv2/wCTJf7rbNIEaW5MrA8Cwzq8hP2nBPCqg82Psij6dyKeI5PNtSZ53X3ShQMNJQ2Vkm6SDrBB/c/af/ecvdGK8txji8cZOup/X/g7pWWZDUrGXYCvBuTk9tm1LR4uJQis5OAoLE+QGazog52RivJKW3o/PF3OZJHkPN2Zz6sS3619UohyVxj7I9NXHlikYq2mZs7OsZJ5FiiQu7clGNevM6DTxoa7bY1x5pPoT992f7RiXiNsWHXgZHI8ioOT8AanTOOHE8eT1srLoQSCCCNCCMEHwIPKoO+M1JbR5oSfoLsqt+DZkOnvcbfNm/Ssjx/Epc2RIt1DhFAKA8TJlSDyIwfQ0JT09n5a2hbGKWSI843ZP5SR+lYnuKJ89cZfBriht7l73Y7PlurT6W90Ik9vIKZC8BIJZi3LTNTopsnikqreRRNF9ztoW0yyQoZQh40uIuB0IH1gG0z5HPxpoz/nqLoOM+jfg1t/doW9xdGaAyHjVe8Lgg94PZwFI0wANOVGbuHV2V18s/0K3UFgdl7N9rie0EZOXg9g+PD9VvTGnqpr5/x7DdN/OuzKDMq9OzfhlrqgOUxzwq6lGGVPMf8AjkfOt9F86ZqcHpoxlFNaIK7heN+IuFYkATtlY5QAQsV6UwUbkFmGAfZBz7rfQuFcYryY8repexXX4xnW/Ge6kzHKuvdMyltMe1H3oZmXUDiiLDXGAdB6CLUirtg4GYy6a54eR1JGnRhIzIfiUastaNXMmekk4WOA3LXhEq6efBxyfMhfDNT+YT66RpG6Mis8RjWMHL3Uy5iXGNUJKiZugPDoRgtka6pWJHVXQ31ZltbQyDTvBE2ON5NJ7jGmJNB3UX92AufBQSG8lxbj0a9109X7+xaU45MqoAwBgDkByA8q8ROblLbfU7Utdj7WBJTu03a/c2phU+3P7PmEGrH8l/ir0X8P4fq3eo+yOvCp57ObwjkBr3pfGWC3dzhEZzzwoLHHjgdKGE7Ix+56PdjdyQyLLExV0PErDofjzoRZXGyPLLsdE2Z2mQgSPcWrGaRVVmRvYbhBC+w7exz14c1Oyjs4RJtckvpMW1ZIb7Y5vJQBdW7LGXGhc8SgB/tZRgfWpfYUxsx8pVJ/SznBqC/fRNn6d3bsu4tYIfsRop9Qoz+OaHhrp89jl8knUmsUAoD4aA4B2q7M7naMhHuzBZB8RwsP5lJ/iqGer4Tbz0Je3Qp9QWZ2PsdjMlrIGmZkV2T6OVTgAYAksSvEeLJ6451l4PL8WWrl0Of70byXczNBKRDHGxT6PH7Ma8JI4SB73x08hUFvh4dMYqa6t+WVyoLEUJJndTbrWc4lGSh9mRR1Q+HmOY+PjVfxLCjlUuD7+DlyaFbDXnwdytrhZEWRGDKwBBHIg9a+bX1Sqm4S7o8+009MyVqXwCO2xexKrRNPHFI6kLxlSckfYJyw8qteG413qxnGDaTNNklrqyt2g4V7l3LIyJNHbzhyycRljZLaSJVljAKZDcJwrgcI5176y+2uUVGDaff4OLljLezLLdTxBZZGEMOSCb4pC6gdIXixJIOWFaNT4kmrCNvTqcksVPyfZwoYd+GYaEPdJ9FsxnOqQqP2rctJGHQjFc2XlyqhuMW/hG2rHimeluC9xEXuUfLuY+LuxEI4QgkMKA6MWYquCSoBJY4wajPulZhc8ovb8Lx+Z0wSUtFur59JNPqd6FYGRhvbpIkaR2CogySegFb8eiV1ihHuyFFyekcL3m2015O0zZC8kX7KDkPU8z619K4fhxxaVBd/J6HFpVUdeSJruOgmt2t5biwZ3h4P2i8JDgldNcjBGoz+NNnLlYsMjSk+x53d2jbxT8d1bCeM5yuSCpOvEq5APoaGOTTZKtRqlrRarS22dtV3gt7Y2cwUvGwYFHxzWRBoOYOmuh10IM9CulLJw9SnLmXkp1880KvZuODglLOv31HAPUAZI8eLNQWlSrsauXsbG52zfpN7bw9DIpb9xPbb8Bj40Mc6306ZP4P0qorI8YeqAUAoBQHOe2jY5ktkuFHtQN7X+G+Afk3CfnUMtuE38lvK/JxU1B6gt3ZlvELO6/aNwwzDhcnkCMlXPkCSP4qlFZxPGd1e4rqi67e3OtNotJfw3DcBB4hFHx8TpoSuSMk4A054p3KmnPtxY+nKP9yg777rrs+RUFwsvGvFjHC6/vjJGD0PlUF1g5jyItyWtEDcWUkYBeN0De6WVlz+7ka0OuNsJPUXv8jBQ2Ft3I3vNme6ly0DHOmpQnmyjqD1HxHgaPi3CY5UXOC1JFfl4nqfVHudaWVZoiYpBiRTwyKc4yMBh5jn8K8PyTx7l6kezKWcX9rNOx2bJGuFm7gfZt440GeZZ2kVmdmOSScc+XU+iu/iaW9UwWvk5o0LyYGnuuNYWmuCveOrYAUmM+0kvfImMD3CoKnP42UuLJ4XqRmlPXY1en9WiRtdmxRkssa8TDDOfadh4O7ZZh6mvH3cRybnuU2darijWmtFt0eSAyQhQzcEOCp5kgQsDHk+QB86teG8ZyvUjW3tfJrnVHWzDZXtxcKV7y2KhU4isPewtIS7MFy4zhe7yckZzV/xHjMcRxSSk2aIVcx9sNnvFIoWOONBxcRiLJG4I0AtySI3Da5UnIHPXAouI8SxcvH6R1M3V1yjIk7y7SJGkkYKijJY8hVBRRZdPlgtnSk5PSOP7672teN3aZWBToDoWI+s/h5D48+XveFcKjix5pfcXWJiKpc0u5VauzvFATW7e3foxZZIUngf34Xxgno6nB4WHjTZx5WL6vWMtNeSWvNk2F0C9jMYpef0Sc44vKKQnGfIk/Cp6HNDIyKXy3La90R+6G1Esrk3EgYtErBYgMEuwK4Yn3ANc8z5UN+bVLIrUIdn5IzbO0XuZ5J5MccjcRxoBoAAPQAD4VB0UUqqCgvB0bsS2PlpbthoP2SepwzkfDhHzqUUvGb+qrX6nXakoRQCgFAKA19oWiyxvE4yrqVYeIYYNDKE3GSkvB+Z9u7Ke1uJLd+cbYz9peasPUYNYntcW+N1akiPoby27A35vLa3W0t0T3mw3CzuS5JwozjOT4dKnZV5HD6pzdtj6Ep9Cj2d/S9oft76T247djxBSdBJOeRIPTUAgY5ZA5oylkv0qOkV3ZS9sbVmupWmmcu7fIDoqD6qjw/M1BbUY8KY8sTSobxQExu/vJPZtmJsqfejbJQ+ePqnzFcGbw6nKWpLr7nNfjQt79zpWxO0C1mAWQmB/B/cz91xp88V5DM4BkVfVDqiptwrIfJa4pVYZVgwPUEEfAiqSVVkHppo5Gtdz3WpgVKb8A8TTKo4nYKB1YgD5mt0a7bHpJsKO+iRUdt9oVrDkREzv93RAfNzp8s1dYf8P3W9bOiOyrCsn93RHN9v7w3F43FK3sg+zGuiL6DqfM167D4fTix1BfqW1GNGpdP7kRXedBvbF2TLdSrDCvE5ycZVdBzOWOOVDTkXxphzyN7e/Z9pbzCK2maUKCJOMYKyKxBX3QCPTPKhz4eRZOLlatew3T2nbQSk3VstxEwxjCllI5FOIga9dfChOZRZbFelLTJfbGxrS6t5LzZ6SRrCcTQSakKdRImGbTnkZ6HljWTkpvtptVV73vsymsagt0l2MlrbtI6xoMs7BVHiScChjbYoRcn4P0tuxshbS2it1+oup8WOrN8STWWjxV9ztsc35JWhpFAKAUAoBQHOO1/dfvohdxL+0hGHA5tFzz6qST6E1DLbheX6c+SXZnFqg9QSGwdqvazx3EeC0Zzg8iDoVPqM69Kk0ZNHrVuB2fbGzbbbdmssRAkAJRjzR/rRyDw8fgRUnmKrLMG7UjiO0bCSCRopUKOhwVP5jxB8axPVVWxtipRezWobBQbFAKAzWt5JFrHI8f7jFfyrVPHqn90UzCVcJd0SsW99+owLqT48LfiwNccuFYsu8EaXh0v8Il3uv20N1J8OFf8AKBUw4Vix7QRCw6V4Im5upJDmSR3P32Lf5jXXXRXD7YpG+NUI9kYs1tMxQHuGIswUDViAOmp0GtDGUkltmSOWWFyVZ45FLKSpKMp1BBI1HUEUMfotj7ouPZptwxPOhhNy8q8aR5Xid1PtYL8yVJbz4KlFXxShtRknpI9dqG7ywNDcJEIRcKeOEHISQYJxjTUHppkHxoyOF5LmnW3vXk+7obw29haTh2EstxjEKjIChWA7x/dGeI5GScChGVj25N6aWkvJRAKgul0R1Lsc3X4m+nSLouVhB6nk0nw1UepqUef4tl7fpR/U69UlCKAUAoBQCgFAeXXPOgOCdpG6Bspu8jX+jyk8P3GOpjPgOq+WR0qGeo4bm+rDkl9yKZUFsTu6W881hKJI/aRsCSMnRh+jDof0qTizMOORH58HWNp7MstuWwlicLIuQrge2jf2cq9R5fEGp7nnq7LsGzll2K/ub2bxkzLfJIXRgFAJWMqw0dGXVuvhjHKo0dmVxWba9J6RA7L3Qiba72JZnhjLMSCAxUKrAMR5sFJFNdTqtzZrDVnlkVvLsgfTp4bbgdFLOO7IKIijLBiNF4eRz+ZozoxsjVClZ37fmQthZSTyLFEpZ3OFUdT+gAyT4AGoOuy2MI80jY2jsW4txmaGSMcTJllIBZeYB6+vI9KGFWVVa9QeyPodAoBQChIIoYvqjou9mz9ny2H+0LNCsneIHClgEY6sGQ6LrjHTUeNZFFj23xu9G19Opqbcjj2nbG+iULdQqPpUQ+uvLvkHP/pkHkMwbaJSxLfSl9r7P/gplndPFIskbFXQhlYcwRUFrZXG2LjLsyW3p3ruL9kM3AAgwqoCFyebHJJyceOlO5z4uFXj75fJBUOwsO5W7D384QZES4Mr+C/ZB+03IfE9KlHBnZaoh8+D9EWVqkSLGihURQqqOQAGAKk8jKTk22Z6ECgFAKAUAoBQCgNTamzo7iJoZVDI4wR+o8D50MoTlCSlHufn3fTdSXZ8vC2WiYnu5fEfZbwcD58x5YnrcLNjkQ/q8lcNCwJDYm2Z7SUSwOUYcxzVh9l16j8fDFSc2RjV3R1NHZt1u0C2vV7mU9xMw4eHiwGz1ifTB8tCPPnTezzWVw+yh7XVFT3v2dBsmOZIZXkmvML7WOOOEElyWGp4jgZOCfPBqeyO3ElPLnHnX0xImwIttjSycpL2URL491H73wOGH8QqOyOmad2Yo+I9So2ty8brJGxV1OVYHBBHUGsS0shGcWpdi2XiXsuzHnuZZTGky90jgguXI4nJOrKNQo5ZJ6AVl4Kqv0YZSjUvHUgrfd27khNwlvI0Qz7YGeXMgcyB4gUO6WZTGfI31IqoOpNPsKAzx2jmNpQvsIVUt04mzgeuhoa3bFS5PJd909ibOWOM7QZjLc6wwr3hIj5B2EevtHOM9APOpSKfMy7nJ+l2j3ZZN29wJre6uFZ1aykUoVfV5EIyug0VlJxxeR010k48jPjZCP8AvRzabvdnXrqp9qF2Q55Ong46hlxkedQXcVHKoTkQ7kZOBgdBzwPCoOyK0kj5Qklt29gTXswhiGvNnPuov2m/QdfyHLlZUKIc0u/sfoXdzYUVlCsMQ0HvMfeZurMfE1keRvulbPnkStDSKAUAoBQCgFAKAUAoDT2rs2K4iaGVA6OMEH8x4EdDQzrslXJSj3OF777izWJLpmS3zpJ1TylHT97kfKo0enwuIxu+mb1Ip9QWgoGtmSaZnOWZmOAMsSxwOQyTy8qGEa4x6RWjd2rtZplij92OCMRov+Zz95m1PwHSpNVGOq3KXlssHZdbWrXga5eMcAzGjnAeQ8ueh4eePEiiOPis7FXqC/M6JvNu/Je29zBDdCSTv0Y94eFY8Kp7ocCnTBDcvra1JR416osjOS8G3u2l7bJFDcJaxQIqRKVkdpC2irgcIGp9OdDDIlXZJyhvZA7/AO591eyq0FvDGq8WXZkV5CeRPCDoNcZPWoaOvBzYUJ87bIKz7Ibs/wBZPAg093jkPnoVUfiaaOyfGofhiy27P7PbWG2NvcTmRGlExyRECVXhxzzw4151JXWZ1tlnPFaetGXaW+myrNmaPhklIAIgUMxCjAUyaDAHTOnhTZFWDk3fC+Shbxdp93cApCBboeqnMhHm/wBX4D41Gy2x+EVw6z6so7uSSSSSSSSdSSdSSepzUFvGKitI80JLDujujcX74QcMQPtzEeyPEL9pvL54qdHBl50KF36+x3rd3YENlCIYVwObN9Zm+056mpPLXXztlzTJWhpFAKAUAoBQCgFAKAUAoBQHiSMMCCAQdCDqCPAipCbXVHMt7+yxHzLZYjbmYToh/cP1D5cvSsdFzicWlD6bOq9zlO0dnywOY5o2jcfVYY+IPIjzGlQegpvhbHcXs1aG0UJFCGtkxsPee7swRbzFAx4mXhVgTjGTxA9Pyocl+DTd9yN2836vpmiaSYN3MgkVeBVXjXkWCgZx4VOzVHhdEU0l3JGXtT2iRgNEvmsev/MSPwps0rg9C9yOut/tpSZzduPJVRPlwrn8abN0OGY8fwkFd3sspzLLJIfF3Z/8xNQdcKK4domvQ26FAZbW2eRgiIzu3JVBYn0AoYTtjXHcno6buj2Vs2Jb08I5iBTqf8Rhy9F+dToosviz+2r+51e0tUiRY40VEUYCqAAB5AVJRSlKT22Z6ECgFAKAUAoBQCgFAKAUAoBQCgFAaO1NkQXKcE8SyL4MOXmDzB8xQzrtnW9wejnO3eyJDlrWYp/dye0voHGo+OajRb0cYmuli2UPa+5d/bZ47Zyo+vGO8X1ymSPiBQtquIUWdpa/Mr5GDjr4dag7VJPsxQkUAoBQbFA2kupM7K3Vvbn+qtpCPtFSifzPgH4ZocludRX3ki9bC7IWOGupsD+zi1PoXYY+Q+NToqr+MvtWv1OkbE3etrReGCJUzzPNj+8x1NSinuvste5vZKihpFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgPhFSQaV9se3mGJYI5P3kVvzFQbI2zj2bIK57OdmP8A/GC/uM6/gDih1R4hkR/EaL9lOzjyEw9JD+oNRpG1cVyfc+R9lGzhzEzesn+gFNIPi2T7m5bdm2zEx/Ry2PtO7fMZxUmuXEciX4ibsN37SD+qt4k81RQfnjNQc077J/dJkkoqTSfaEigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAf/2Q=="
                      style={styles.image}
                      alt=""
                    />
                  </div>
                  <p style={styles.heading}>
                    {isOn === "English"
                      ? "MINISTRY OF COMMUNICATIONS AND INFORMATION TECHNOLOGY"
                      : "وزارة الاتصالات وتكنولوجيا المعلومات"}
                  </p>
                </div>
                <div style={styles.usecaseview}>
                  <p style={styles.usecasetext}>
                    {isOn === "English"
                      ? "Implementation of Use cases wave 3 -"
                      : "تنفيذ حالات الاستخدام الموجة 3 -"}
                  </p>
                  <p style={styles.usecasetext}>
                    {isOn === "English"
                      ? "Smart Water and Electricity Experience and Insights"
                      : "تجربة ورؤى ذكية في مجال المياه والكهرباء"}
                  </p>
                </div>
                <div style={styles.confidentialview}>
                  <p style={styles.confidentialheadingtext}>
                    {isOn === "English"
                      ? "Confidential & Proprietary"
                      : "سرية وملكية"}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {isOn === "English"
                      ? "The contents of this document are intended solely for the use of the Ministry of Transport and Communications"
                      : "محتويات هذا المستند مخصصة فقط لاستخدام وزارة النقل والاتصالات."}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {isOn === "English"
                      ? "The use, duplication, or disclosure of the information is restricted to this purpose except where exempted by"
                      : "يقتصر استخدام المعلومات أو نسخها أو الكشف عنها لهذا الغرض إلا في حالة الإعفاء من ذلك"}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {" "}
                    {isOn === "English"
                      ? "Implementation of Use cases wave 3 -"
                      : "بالاتفاق في أماكن أخرى."}
                  </p>
                </div>
              </div>
            </div>

            <div style={isOn === "English" ? styles.page : styles1.page1}>
              {/* <div style={styles.section}> */}
              <div>
                <div style={styles.tableHeading}>
                  <p style={styles.tbcontentheading1}>
                    {isOn === "English"
                      ? "Table of Contents"
                      : "جدول المحتويات"}
                  </p>
                </div>
                {/* view for the table content pdf value map for the print  heading */}
                <div style={styles.tablecontent}>
                  {pdfValue.length > 0 &&
                    pdfValue.map((val, i) => {
                      if (!renderedHeaders.includes(val.header)) {
                        // If the header hasn't been rendered, add it to the renderedHeaders array and render it
                        renderedHeaders.push(val.header);
                        return (
                          <div>
                            <p style={styles.tbcontentsubheading}>
                              {val.header}
                            </p>
                            {val.data.map((e, ii) => (
                              <>
                                <p style={styles.tbcontentsubheadtext}>
                                  <p
                                    style={styles.tbcontentsubhead}
                                  // href={`nav${ii}`}
                                  >
                                    {` ${e.name}`}
                                  </p>
                                </p>
                              </>
                            ))}
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            {val.data.map((e, ii) => (
                              <>
                                <p style={styles.tbcontentsubheadtext}>
                                  <p
                                    style={styles.tbcontentsubhead}
                                  // href={`nav${ii}`}
                                  >
                                    {` ${e.name}`}
                                  </p>
                                </p>
                              </>
                            ))}
                          </div>
                        );
                      }
                    })}

   
                </div>
                {/* <div
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    width: "100%",
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#555',
                    margin: "0 3rem 0 2rem",
                    borderTop: "1px solid #555"
                  }}>
                    <div style={{ flex: 2, fontSize: "12px", paddingTop: "5px" }}>
                      وزارة المواصلات والاتصالات
                    </div>
                    <div style={{ flex: 2, textAlign: 'center', fontSize: "13px", fontWeight: 700, paddingTop: "5px" }}>
                      مؤتمن
                    </div>
                    <div style={{ flex: 1, textAlign: 'right', fontSize: "12px", paddingTop: "5px" }}>
                      الصفحة 1|2
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div style={isOn === "English" ? styles.lastPage : styles1.lastPage1}>
              <div style={styles.section}>
                {type === 1 ? (
                  <>
                    {pdfValue.length > 0 &&
                      pdfValue.map((val, i) => {
                        if (!renderedHeaders2.includes(val.header)) {
                          renderedHeaders2.push(val.header);

                          return (
                            <div style={styles.response}>
                              <p style={styles.tbcontentheading} key={i}>
                                {` ${val.header}`}
                              </p>
                              {val.data.map((items, ii) => {
                                return (
                                  <div style={styles.response1}>
                                    <p
                                      style={styles.contenttitle}
                                      id={`nav${ii}`}
                                      key={i}
                                    >
                                      {` ${items.name}`}
                                    </p>
                                    {items.value !== "" ? (
                                      isHTML(items.value) ? (
                                        <div
                                          style={
                                            isOn === "English"
                                              ? styles
                                              : styles1
                                          }
                                          className="para parat"
                                        >
                                          <div
                                            className="para parat"
                                            dir={
                                              isOn === "English"
                                                ? "ltr"
                                                : "rtl"
                                            }
                                            dangerouslySetInnerHTML={{
                                              __html: items.value,
                                            }}
                                          ></div>
                                        </div>
                                      ) : (
                                        <p
                                          className="para"
                                          style={styles.contentsubtitle}
                                        >
                                          {items.value}
                                        </p>
                                      )
                                    ) : (
                                      <p
                                        className="para"
                                        style={styles.contentsubtitle}
                                      >
                                        No data found.
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        } else {
                          return (
                            <div style={styles.response}>
                              {val.data.map((items, ii) => {
                                return (
                                  <div style={styles.response1}>
                                    <p
                                      style={styles.contenttitle}
                                      id={`nav${ii}`}
                                    >
                                      {` ${items.name}`}
                                    </p>
                                    <p style={styles.contentsubtitle}>
                                      {items.value !== "" ? (
                                        isHTML(items.value) ? (
                                          <div
                                            style={
                                              isOn === "English"
                                                ? styles
                                                : styles1
                                            }
                                            className="para parat"
                                          >
                                            <div
                                              className="para parat"
                                              dir={
                                                isOn === "English"
                                                  ? "ltr"
                                                  : "rtl"
                                              }
                                              dangerouslySetInnerHTML={{
                                                __html: items.value,
                                              }}
                                            ></div>
                                          </div>
                                        ) : (
                                          <p
                                            className="para"
                                            style={styles.contentsubtitle}
                                          >
                                            {items.value}
                                          </p>
                                        )
                                      ) : (
                                        <p
                                          className="para"
                                          style={styles.contentsubtitle}
                                        >
                                          No data found.
                                        </p>
                                      )}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                  </>
                ) : (
                  <div className="parat" dir={isOn === "English" ? "ltr" : "rtl"}>
                    <div

                      dir={isOn === "English" ? "ltr" : "rtl"}
                      dangerouslySetInnerHTML={{ __html: value }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles1 = {
  page1: {
    paddingTop: 0,
    pageBreakAfter: "always",
    paddingBottom: 1,
    paddingHorizontal: 50,
    fontFamily: "NotoSansArabic",
    direction: "rtl",
    // pageBreakBefore:"always"

  },
  lastPage1: {
    paddingTop: 0,
    pageBreakInside: "avoid",
    paddingBottom: 0,
    paddingHorizontal: 50,
    fontFamily: "NotoSansArabic",
    direction: "rtl",
    // border:"2px solid black"
  },
  span: {
    fontSize: 10,
    fontFamily: "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "rtl",
  },
  contentitems: {
    width: "300px",
    minWidth: "400px",
    flex: 1,
    alignItems: "flex-end", // Align items to the end to achieve RTL direction
    paddingRight: 20,
  },
  p: {
    fontSize: 12,
    fontFamily: "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "RTL",
    flexDirection: "row-reverse",
  },
  ol: {
    fontSize: 12,
    fontFamily: "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "RTL",
    writingMode: "horizontal-tb",

    unicodeBidi: "embed",
  },

  li: {
    fontSize: 12,
    fontFamily: "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    // textAlign: "right",
    paddingLeft: 10,
    rotate: 180, // Rotate the list item content to achieve RTL effect
    rotateOrigin: "right top",
    direction: "LTR",
    flexDirection: "row-reverse",
    writingMode: "horizontal-tb",
    unicodeBidi: "embed",
  },

  table: {
    width: "1000px",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "8px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    fontSize: "12px",
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "11px",
  },

  tr: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  h3: {
    fontSize: 5,
    marginBottom: "-25px",
    fontFamily: "NotoSansArabic",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h4: {
    fontSize: 14,
    marginBottom: "-25px",
    fontFamily: "NotoSansArabic",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h6: {
    minWidth: "",
  },
};

//inline style defirn.
const styles = {
  page: {
    paddingTop: 0,
    paddingBottom: 1,
    pageBreakAfter: "always",
    paddingHorizontal: 50,
    // border:"2px solid black"
  },
  page1: {
    paddingTop: 0,
    pageBreakAfter: "always",
    paddingBottom: 0,
    paddingHorizontal: 50,
    fontFamily: "NotoSansArabic",
    direction: "rtl",
    // border:"2px solid black"
  },
  lastPage: {
    paddingTop: 0,
    paddingBottom: 0,
    pageBreakInside: "avoid",
    paddingHorizontal: 50,
    // border:"2px solid black"
  },
  contentitems: {
    width: "300px",
    minWidth: "400px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "8px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    fontSize: "12px",
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "11px",
  },
  tr: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  span: {
    fontSize: 12,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
    paddingLeft: 10,
  },
  p: {
    fontSize: 12,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
    paddingLeft: 10,
  },
  h3: {
    fontSize: 16,
    marginBottom: "-25px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
  },
  h4: {
    fontSize: 14,
    marginBottom: "-25px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
  },
  // ol: {
  //   fontSize: 14,
  //   marginBottom: "-25px",
  //   fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  //   color: "#000",
  //   textAlign: "right",
  //
  // },
  // li: {
  //   fontSize: 14,
  //   marginBottom: "-25px",
  //   fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  //   color: "#000",
  //   textAlign: "right",
  //
  // },
  h6: {
    minWidth: "",
  },
  heading: {
    margin: "25px 0",
    fontSize: 14,
    textAlign: "center",
    color: "#000",
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  },
  ftitle: {
    margin: 10,
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "#CF2F21",
    textTransform: "uppercase",
    color: "#000",
    padding: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    borderTopWidth: 1,
    paddingTop: 15,
    borderTopColor: "#112131",
    borderTopStyle: "solid",
    alignItems: "stretch",
    color: "grey",
  },
  title: {
    fontSize: 14,
    marginBottom: "5px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
  },
  response: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    textAlign: "justify",
  },
  response1: {
    marginTop: 7,
    textAlign: "justify",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "25px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
  },
  image: {
    marginTop: 70,
    marginBottom: 30,
    // height:"30px",
    width: "125px",
    // marginHorizontal: 200,
    textAlign: "cneter",
    margin: "0 auto",
    //  border:"2px solid black"
  },
  image1: {
    marginBottom: 17,
    width: "200px",
    marginHorizontal: 335,
    display: "flex",
    alignSelf: "center",
  },
  usecaseview: {
    marginTop: 215,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#112131",
    borderTopStyle: "solid",
    alignItems: "stretch",
    padding: "25px 0",
  },
  usecasetext: {
    fontSize: 15,
    textAlign: "center",
    color: "#000",
    marginTop: "2px",
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    fontWeight: 700
  },
  confidentialview: {
    marginTop: 250,
  },
  confidentialheadingtext: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: 600,
    color: "#000",
    marginBottom: "10px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  },
  confidentialheadingsubtext: {
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    marginBottom: 5,
    fontSize: 11,
    textAlign: "center",
    color: "#000",
  },
  tablecontent: {
    marginTop: 10,
    marginBottom: 5,
  },
  tbcontentheading: {
    color: "#000",
    fontSize: 20,
    fontWeight: 600,
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    marginBottom: 4,
    textAlign: "justify",
  },
  contenttitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: "10px",
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
  },
  contentsubtitle: {
    fontSize: 12,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "10px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
  },
  inlineRadio: {
    display: "flex",
  },
  radioPre: {
    content: "() ",
  },
  tbcontentheading1: {
    color: "#208EDD",
    marginBottom: 0,
    padding: "3px",
    fontSize: 17,
    fontWeight: 600,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
  },
  tbcontentsubheadtext: {
    paddingLeft: 10,
    paddingBottom: 0,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
  },
  tbcontentsubheading: {
    marginTop: 0,
    marginBottom: 8,
    padding: "3px",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
  },
  tbcontentsubhead: {
    textDecoration: "none",
    color: "#000",
    fontSize: 14,
    paddingBottom: 2,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
  },
  imageHeading: {
    display: "flex",
    justifyContent: language === "English" ? "start" : "end",
  },

  tableHeading: {
    display: "flex",
    justifyContent: language === "English" ? "end" : "star",
  },
};

export default ReportArbic;
