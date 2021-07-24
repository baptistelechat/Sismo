// REACT
import React, { useState } from "react";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
// MATERIAL UI ICON
import SubjectIcon from "@material-ui/icons/Subject";

// STYLE
const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.secondary.main,
    margin: 0,
  },
  dialogContentText: {
    marginBottom: theme.spacing(1),
  },
  gridContainer: {
    width: "100%",
    background: "rgba(0,0,0,0)",
  },
  fab: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  backDrop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "#ffffff00",
  },
}));

const CGU = () => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <ListItem button onClick={handleOpenDialog} className={classes.listItem}>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Conditions générales d'utilisation"}
          secondary={"Consulter les CGU"}
        />
      </ListItem>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="form-dialog-title">
          <h4 className={classes.title}>
            Conditions générales d'utilisation (CGU)
          </h4>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "16px" }}>
          <DialogContentText className={classes.dialogContentText}>
            Mise à jour : 03/03/2021
          </DialogContentText>
          <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12}>
              <h4>
                Conditions générales d'utilisation du site Internet : SISMO
              </h4>
              <p>
                Le présent document a pour objet de définir les modalités et
                conditions dans lesquelles d’une part, les ÉDITEURS (M. Baptiste
                LECHAT et M. Matthieu LECHAT), mettent à la disposition de ses
                utilisateurs le site (nommée ci-après : SISMO), et les services
                disponibles sur le site et d’autre part, la manière par laquelle
                l’utilisateur accède au site et utilise ses services.
              </p>
              <p>
                Toute connexion au site est subordonnée au respect des présentes
                conditions.
              </p>
              <p>
                Pour l’utilisateur, le simple accès au site des ÉDITEURS à
                l’adresse URL «{" "}
                <a href="https://sismo.vercel.app/">www.sismo.vercel.app</a> »
                implique l’acceptation de l’ensemble des conditions décrites
                ci-après.{" "}
              </p>

              <h4>Propriété intellectuelle</h4>
              <p>
                La structure générale du site SISMO, ainsi que les textes,
                graphiques, images, sons et vidéos la composant, sont la
                propriété des ÉDITEURS ou de ses partenaires. Toute
                représentation et/ou reproduction et/ou exploitation partielle
                ou totale des contenus et services proposés par le site SISMO,
                par quelque procédé que ce soit, sans l'autorisation préalable
                et par écrit des ÉDITEURS et/ou de ses partenaires est
                strictement interdite et serait susceptible de constituer une
                contrefaçon au sens des articles L 335-2 et suivants du Code de
                la propriété intellectuelle. Les pages du site SISMO ne peux pas
                être utilisées à des fins commerciales et publicitaires.
              </p>

              <h4>Liens hypertextes</h4>
              <p>
                Le site SISMO peut contenir des liens hypertextes vers d’autres
                sites présents sur le réseau Internet. Les liens vers ces autres
                ressources vous ouvrent un nouvel onglet dans votre navigateur
                Internet et ne vous font pas quitter le site SISMO.
              </p>
              <p>
                Il est possible de créer un lien vers la page de présentation de
                ce site sans autorisation expresse des ÉDITEURS. Aucune
                autorisation ou demande d’information préalable ne peut être
                exigée par l’éditeur à l’égard d’un site qui souhaite établir un
                lien vers le site de l’éditeur. Il convient toutefois d’afficher
                ce site dans une nouvelle fenêtre du navigateur. Cependant, les
                ÉDITEURS se réservent le droit de demander la suppression d’un
                lien qu’il estime non conforme à l’objet du site SISMO.
              </p>

              <h4>Responsabilité de l’éditeur</h4>
              <p>
                Les informations et/ou documents figurant sur ce site et/ou
                accessibles par ce site proviennent de sources considérées comme
                étant fiables.
              </p>
              <p>
                Toutefois, ces informations et/ou documents sont susceptibles de
                contenir des inexactitudes techniques et des erreurs
                typographiques.
              </p>
              <p>
                Les ÉDITEURS se réservent le droit de les corriger, dès que ces
                erreurs sont portées à sa connaissance.
              </p>
              <p>
                Il est fortement recommandé de vérifier l’exactitude et la
                pertinence des informations et/ou documents mis à disposition
                sur ce site.
              </p>
              <p>
                Les informations et/ou documents disponibles sur ce site sont
                susceptibles d’être modifiés à tout moment, et peuvent avoir
                fait l’objet de mises à jour. En particulier, ils peuvent avoir
                fait l’objet d’une mise à jour entre le moment de leur
                téléchargement et celui où l’utilisateur en prend connaissance.
              </p>
              <p>
                L’utilisation des informations et/ou documents disponibles sur
                ce site se fait sous l’entière et seule responsabilité de
                l’utilisateur, qui assume la totalité des conséquences pouvant
                en découler, sans que l’EDITEUR puisse être recherché à ce
                titre, et sans recours contre ce dernier.
              </p>
              <p>
                Les ÉDITEURS ne pourront en aucun cas être tenu responsable de
                tout dommage de quelque nature qu’il soit résultant de
                l’interprétation ou de l’utilisation des informations et/ou
                documents disponibles sur ce site.
              </p>

              <h4>Accès au site</h4>
              <p>
                Les ÉDITEURS s’efforcent de permettre l’accès au site 24 heures
                sur 24, 7 jours sur 7, sauf en cas de force majeure ou d’un
                événement hors du contrôle des ÉDITEURS, et sous réserve des
                éventuelles pannes et interventions de maintenance nécessaires
                au bon fonctionnement du site et des services.
              </p>
              <p>
                Par conséquent, les ÉDITEURS ne peuvent garantir une
                disponibilité du site et/ou des services, une fiabilité des
                transmissions et des performances en termes de temps de réponse
                ou de qualité. Il n’est prévu aucune assistance technique vis à
                vis de l’utilisateur que ce soit par des moyens électronique ou
                téléphonique.
              </p>
              <p>
                La responsabilité des ÉDITEURS ne saurait être engagée en cas
                d’impossibilité d’accès à ce site et/ou d’utilisation des
                services.
              </p>
              <p>
                Par ailleurs, les ÉDITEURS peuvent être amené à interrompre le
                site ou une partie des services, à tout moment sans préavis, le
                tout sans droit à indemnités. L’utilisateur reconnaît et accepte
                que les ÉDITEURS ne soient pas responsables des interruptions,
                et des conséquences qui peuvent en découler pour l’utilisateur
                ou tout tiers.
              </p>

              <h4>Modification des conditions d’utilisation</h4>
              <p>
                Les ÉDITEURS se réserve la possibilité de modifier, à tout
                moment et sans préavis, les présentes conditions d’utilisation
                afin de les adapter aux évolutions du site et/ou de son
                exploitation.
              </p>

              <h4>Règles d'usage d'Internet</h4>
              <p>
                L’utilisateur déclare accepter les caractéristiques et les
                limites d’Internet, et notamment reconnaît que :
              </p>
              <p>
                Les ÉDITEURS n’assument aucune responsabilité sur les services
                accessibles par Internet et n’exerce aucun contrôle de quelque
                forme que ce soit sur la nature et les caractéristiques des
                données qui pourraient transiter par l’intermédiaire de son
                centre serveur.
              </p>
              <p>
                L’utilisateur reconnaît que les données circulant sur Internet
                ne sont pas protégées notamment contre les détournements
                éventuels. La communication de toute information jugée par
                l’utilisateur de nature sensible ou confidentielle se fait à ses
                risques et périls.
              </p>
              <p>
                L’utilisateur reconnaît que les données circulant sur Internet
                peuvent être réglementées en termes d’usage ou être protégées
                par un droit de propriété.
              </p>
              <p>
                L’utilisateur est seul responsable de l’usage des données qu’il
                consulte, interroge et transfère sur Internet.
              </p>
              <p>
                L’utilisateur reconnaît que les ÉDITEURS ne disposent d’aucun
                moyen de contrôle sur le contenu des services accessibles sur
                Internet.
              </p>

              <h4>Droit applicable</h4>
              <p>
                Tant le présent site que les modalités et conditions de son
                utilisation sont régis par le droit français, quel que soit le
                lieu d’utilisation. En cas de contestation éventuelle, et après
                l’échec de toute tentative de recherche d’une solution amiable,
                les tribunaux français seront seuls compétents pour connaître de
                ce litige.
              </p>
              <p>
                Tant le présent site que les modalités et conditions de son
                utilisation sont régis par le droit français, quel que soit le
                lieu d’utilisation. En cas de contestation éventuelle, et après
                l’échec de toute tentative de recherche d’une solution amiable,
                les tribunaux français seront seuls compétents pour connaître de
                ce litige.
              </p>
              <p>
                Pour toute question relative aux présentes conditions
                d’utilisation du site, vous pouvez nous écrire à l’adresse
                suivante :
              </p>
              <li>
                <a href="mailto:baptistelechat@outlook.fr">
                  baptistelechat@outlook.fr
                </a>
              </li>
              <li>
                <a href="mailto:matthieulechat@outlook.fr">
                  matthieulechat@outlook.fr
                </a>
              </li>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CGU;
